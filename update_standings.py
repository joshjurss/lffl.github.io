#!/usr/bin/env python3
"""
update_standings.py
Fetches live 2026 World Cup group standings from ESPN's unofficial API
and patches ACTUAL_RESULTS, LIVE_STANDINGS, and GROUP_STANDINGS in
both data.js and index.html.

Run by GitHub Actions every hour.
Requires: pip install requests
"""

import json
import re
import sys
import requests
from datetime import datetime, timezone

ESPN_URL        = "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings"
ESPN_SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard"
HEADERS         = {"User-Agent": "Mozilla/5.0"}
DATA_JS         = "data.js"
INDEX_HTML      = "index.html"

# All knockout dates: R32 (Jun 28–Jul 3), R16 (Jul 4–7), QF (Jul 9–11), SF (Jul 14–15), Final (Jul 19)
KNOCKOUT_DATES = [
    "20260628","20260629","20260630","20260701","20260702","20260703",
    "20260704","20260705","20260706","20260707",
    "20260709","20260710","20260711",
    "20260714","20260715",
    "20260718","20260719",
]

ROUND_SLOTS = {
    "roundOf32":    16,
    "roundOf16":    16,
    "quarterFinal": 8,
    "semiFinal":    4,
    "final":        2,
}

GROUP_KEYS = ["groupA","groupB","groupC","groupD","groupE","groupF",
              "groupG","groupH","groupI","groupJ","groupK","groupL"]

# ── Fetch & parse ────────────────────────────────────────────────────────────

def fetch_standings():
    resp = requests.get(ESPN_URL, headers=HEADERS, timeout=20)
    resp.raise_for_status()
    data = resp.json()

    final_results   = {k: [None, None] for k in GROUP_KEYS}
    live_standings  = {k: [None, None] for k in GROUP_KEYS}
    group_standings = {k: [] for k in GROUP_KEYS}

    # ESPN structure: data["children"] = list of group objects
    # each group: {"name": "Group A", "standings": {"entries": [...]}}
    children = data.get("children", [])
    found = 0
    for child in children:
        name = child.get("name", child.get("abbreviation", ""))
        m = re.search(r"Group\s+([A-L])\b", name, re.IGNORECASE)
        if not m:
            continue
        key = "group" + m.group(1).upper()

        entries = child.get("standings", {}).get("entries", [])
        team_rows = []
        for entry in entries:
            team_name = entry.get("team", {}).get("displayName", "")
            if not team_name:
                continue

            stats = {s["name"]: s.get("value", 0) for s in entry.get("stats", [])}

            mp  = int(stats.get("gamesPlayed", 0))
            w   = int(stats.get("wins", 0))
            d   = int(stats.get("ties", stats.get("draws", 0)))
            l   = int(stats.get("losses", 0))
            gf  = int(stats.get("pointsFor",     stats.get("goalsFor",     0)))
            ga  = int(stats.get("pointsAgainst", stats.get("goalsAgainst", 0)))
            gd  = int(stats.get("pointDifferential", stats.get("goalDifferential", gf - ga)))
            pts = int(stats.get("points", w * 3 + d))

            team_rows.append(dict(team=team_name, mp=mp, w=w, d=d, l=l,
                                  gf=gf, ga=ga, gd=gd, pts=pts))

        if not team_rows:
            continue

        found += 1
        sorted_rows = sorted(team_rows, key=lambda r: (-r["pts"], -r["gd"], -r["gf"]))
        group_standings[key] = sorted_rows
        teams   = [r["team"] for r in sorted_rows]
        mp_vals = [r["mp"]   for r in sorted_rows]

        if any(mp > 0 for mp in mp_vals) and len(teams) >= 2:
            live_standings[key] = [teams[0], teams[1]]

        if len(mp_vals) == 4 and all(mp == 3 for mp in mp_vals) and len(teams) >= 2:
            final_results[key] = [teams[0], teams[1]]

    # Compute best 8 third-place teams
    third_place = []
    for key, rows in group_standings.items():
        if len(rows) >= 3 and rows[2]["mp"] > 0:
            third_place.append(rows[2])
    third_place.sort(key=lambda r: (-r["pts"], -r["gd"], -r["gf"]))
    live_thirds = [r["team"] for r in third_place[:8]]

    print(f"Found standings for {found}/12 groups.")
    if found == 0:
        print("WARNING: No group data found.")
        print("Response keys:", list(data.keys()))
    print(f"  Best third-place teams advancing: {live_thirds}")

    return final_results, live_standings, group_standings, live_thirds


# ── Knockout results ─────────────────────────────────────────────────────────

def detect_round_key(event):
    # event.season.slug is the reliable field: "round-of-32", "round-of-16", etc.
    slug = (event.get("season") or {}).get("slug", "").lower()
    if "group" in slug or not slug:
        return None
    if "32" in slug:     return "roundOf32"
    if "16" in slug:     return "roundOf16"
    if "quarter" in slug: return "quarterFinal"
    if "semi" in slug:   return "semiFinal"
    if "final" in slug:  return "final"
    # Fallback: check altGameNote in competitions[0]
    comp = (event.get("competitions") or [{}])[0]
    note = (comp.get("altGameNote") or "").upper()
    if "32" in note:     return "roundOf32"
    if "16" in note:     return "roundOf16"
    if "QUARTER" in note: return "quarterFinal"
    if "SEMI" in note:   return "semiFinal"
    if "FINAL" in note:  return "final"
    return None

def fetch_knockout_results():
    """Return dict with roundOf32…champion lists of winners from completed matches."""
    slots = {k: [] for k in ROUND_SLOTS}
    slots["champion"] = None
    seen = set()

    for dt in KNOCKOUT_DATES:
        try:
            r = requests.get(ESPN_SCOREBOARD, params={"dates": dt}, headers=HEADERS, timeout=20)
            if r.status_code != 200:
                continue
            data = r.json()
        except Exception as e:
            print(f"  Scoreboard {dt} error: {e}")
            continue

        for event in data.get("events", []):
            eid = event.get("id")
            if eid in seen:
                continue
            round_key = detect_round_key(event)
            if not round_key:
                continue
            comp = (event.get("competitions") or [{}])[0]
            st = comp.get("status") or {}
            if not (st.get("type") or {}).get("completed"):
                continue
            seen.add(eid)
            competitors = comp.get("competitors", [])
            if round_key == "final":
                for c in competitors:
                    name = (c.get("team") or {}).get("displayName") or (c.get("team") or {}).get("name","")
                    if name: slots["final"].append(name)
                winner = next((c for c in competitors if c.get("winner")), None)
                if winner:
                    wn = (winner.get("team") or {}).get("displayName") or (winner.get("team") or {}).get("name","")
                    if wn: slots["champion"] = wn
            else:
                winner = next((c for c in competitors if c.get("winner")), None)
                if winner:
                    wn = (winner.get("team") or {}).get("displayName") or (winner.get("team") or {}).get("name","")
                    if wn: slots[round_key].append(wn)

    for k, teams in slots.items():
        if k != "champion":
            print(f"  {k}: {len(teams)} winners found")
    return slots

def build_knockout_js(slots):
    lines = []
    for key, n in ROUND_SLOTS.items():
        teams = slots.get(key, [])
        parts = []
        for i in range(1, n + 1):
            team = teams[i - 1] if i <= len(teams) else None
            parts.append(f'm{i}:{json.dumps(team)}')
        lines.append(f'  {key}:    {{{",".join(parts)}}},')
    champ = slots.get("champion")
    lines.append(f'  champion:     {json.dumps(champ)},')
    return "\n".join(lines)


# ── Patch helpers ─────────────────────────────────────────────────────────────

def build_group_js(standings):
    lines = []
    for key in GROUP_KEYS:
        first, second = standings[key]
        if first and second:
            lines.append(f'  {key}: ["{first}", "{second}"],')
        else:
            lines.append(f'  {key}: [null, null],')
    return "\n".join(lines)

def build_group_standings_js(group_standings):
    lines = []
    for key in GROUP_KEYS:
        rows = group_standings[key]
        if not rows:
            lines.append(f'  {key}: [],')
        else:
            team_strs = []
            for t in rows:
                team_strs.append(
                    f'{{team:"{t["team"]}",mp:{t["mp"]},w:{t["w"]},d:{t["d"]},'
                    f'l:{t["l"]},gf:{t["gf"]},ga:{t["ga"]},gd:{t["gd"]},pts:{t["pts"]}}}'
                )
            lines.append(f'  {key}: [{",".join(team_strs)}],')
    return "\n".join(lines)

def replace_between_markers(content, start_marker, end_marker, new_block, path):
    pattern = re.compile(
        r"(" + re.escape(start_marker) + r"\n).*?(" + re.escape(end_marker) + r")",
        re.DOTALL
    )
    new_content, n = pattern.subn(r"\g<1>" + new_block + r"\n\g<2>", content)
    if n == 0:
        print(f"  SKIP: markers {start_marker!r} not found in {path}")
    return new_content

def build_thirds_js(live_thirds):
    if not live_thirds:
        return ""
    return "  " + ", ".join(f'"{t}"' for t in live_thirds)

def patch_file(path, final_results, live_standings, group_standings, live_thirds, knockout_slots, ts):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = replace_between_markers(
        content,
        "// __ACTUAL_RESULTS_START__",
        "// __ACTUAL_RESULTS_END__",
        build_group_js(final_results),
        path
    )
    content = replace_between_markers(
        content,
        "// __LIVE_STANDINGS_START__",
        "// __LIVE_STANDINGS_END__",
        build_group_js(live_standings),
        path
    )
    content = replace_between_markers(
        content,
        "// __GROUP_STANDINGS_START__",
        "// __GROUP_STANDINGS_END__",
        build_group_standings_js(group_standings),
        path
    )
    content = replace_between_markers(
        content,
        "// __LIVE_THIRDS_START__",
        "// __LIVE_THIRDS_END__",
        build_thirds_js(live_thirds),
        path
    )

    content = replace_between_markers(
        content,
        "// __KNOCKOUT_RESULTS_START__",
        "// __KNOCKOUT_RESULTS_END__",
        build_knockout_js(knockout_slots),
        path
    )

    content = re.sub(r'var LAST_UPDATED = ".*?";',
                     f'var LAST_UPDATED = "{ts}";', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  {path} patched.")

def patch_all(final_results, live_standings, group_standings, live_thirds, knockout_slots):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    patch_file(DATA_JS,    final_results, live_standings, group_standings, live_thirds, knockout_slots, ts)
    patch_file(INDEX_HTML, final_results, live_standings, group_standings, live_thirds, knockout_slots, ts)

    for key in GROUP_KEYS:
        print(f"  {key}: final={final_results[key]}  live={live_standings[key]}  rows={len(group_standings[key])}")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("Fetching standings from ESPN API...")
    try:
        final_results, live_standings, group_standings, live_thirds = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    print("Fetching knockout results from ESPN scoreboard...")
    knockout_slots = fetch_knockout_results()

    patch_all(final_results, live_standings, group_standings, live_thirds, knockout_slots)
