#!/usr/bin/env python3
"""
update_standings.py
Fetches live 2026 World Cup group standings from ESPN's unofficial API
and patches ACTUAL_RESULTS, LIVE_STANDINGS, and GROUP_STANDINGS in
both data.js and index.html.

Run by GitHub Actions every hour.
Requires: pip install requests
"""

import re
import sys
import requests
from datetime import datetime, timezone

ESPN_URL = "https://site.api.espn.com/apis/v2/sports/soccer/fifa.world/standings"
HEADERS  = {"User-Agent": "Mozilla/5.0"}
DATA_JS   = "data.js"
INDEX_HTML = "index.html"

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

    print(f"Found standings for {found}/12 groups.")
    if found == 0:
        print("WARNING: No group data found.")
        print("Response keys:", list(data.keys()))

    return final_results, live_standings, group_standings


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

def patch_file(path, final_results, live_standings, group_standings, ts):
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

    content = re.sub(r'var LAST_UPDATED = ".*?";',
                     f'var LAST_UPDATED = "{ts}";', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  {path} patched.")

def patch_all(final_results, live_standings, group_standings):
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    patch_file(DATA_JS,    final_results, live_standings, group_standings, ts)
    patch_file(INDEX_HTML, final_results, live_standings, group_standings, ts)

    for key in GROUP_KEYS:
        print(f"  {key}: final={final_results[key]}  live={live_standings[key]}  rows={len(group_standings[key])}")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"Fetching standings from ESPN API...")
    try:
        final_results, live_standings, group_standings = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    patch_all(final_results, live_standings, group_standings)
