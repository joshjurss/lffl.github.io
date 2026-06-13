#!/usr/bin/env python3
"""
update_standings.py
Fetches live 2026 World Cup group standings from the Fotmob API (league ID 77)
and patches ACTUAL_RESULTS, LIVE_STANDINGS, and GROUP_STANDINGS in data.js.

Run by GitHub Actions every hour. Safe to run manually too.
Requires: pip install requests
"""

import re
import sys
import requests

API_URL = "https://www.fotmob.com/api/leagues?id=77"
DATA_JS = "data.js"

GROUP_KEYS = ["groupA","groupB","groupC","groupD","groupE","groupF",
              "groupG","groupH","groupI","groupJ","groupK","groupL"]

# ── Fetch & parse ────────────────────────────────────────────────────────────

def fetch_standings():
    """
    Returns (final_results, live_standings, group_standings).
    final_results:   groupX -> [1st, 2nd] only when group fully complete, else [None, None]
    live_standings:  groupX -> [1st, 2nd] based on current standings (None if no matches played)
    group_standings: groupX -> list of {team, mp, w, d, l, gf, ga, gd, pts} for all 4 teams
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://www.fotmob.com/",
        "Accept": "application/json",
    }
    resp = requests.get(API_URL, headers=headers, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    final_results   = {k: [None, None] for k in GROUP_KEYS}
    live_standings  = {k: [None, None] for k in GROUP_KEYS}
    group_standings = {k: [] for k in GROUP_KEYS}

    # Fotmob structure: data["table"] is a list of group table objects
    # Each has data["data"]["leagueName"] like "Group A" and data["data"]["table"]["all"]
    table_sections = data.get("table", [])
    if not table_sections:
        # Sometimes nested under "standings" or "leagueOverviewTable"
        table_sections = data.get("standings", data.get("leagueOverviewTable", []))

    found = 0
    for section in table_sections:
        section_data = section.get("data", section)
        league_name = section_data.get("leagueName", section_data.get("name", ""))

        m = re.search(r"Group\s+([A-L])\b", league_name, re.IGNORECASE)
        if not m:
            continue

        key = "group" + m.group(1).upper()
        rows_raw = (section_data.get("table", {}).get("all")
                    or section_data.get("table", {}).get("home")
                    or section_data.get("rows")
                    or [])

        team_rows = []
        for entry in rows_raw:
            name = entry.get("name", entry.get("teamName", ""))
            if not name:
                continue

            mp   = entry.get("played", entry.get("mp", 0))
            w    = entry.get("wins",   entry.get("w",  0))
            d    = entry.get("draws",  entry.get("d",  0))
            l    = entry.get("losses", entry.get("l",  0))

            # Goals: sometimes "scoresStr" = "3-1", sometimes separate gf/ga fields
            gf, ga = 0, 0
            if "scoresStr" in entry:
                parts = str(entry["scoresStr"]).split("-")
                if len(parts) == 2:
                    try:
                        gf, ga = int(parts[0]), int(parts[1])
                    except ValueError:
                        pass
            else:
                gf = entry.get("gf", entry.get("goalsFor", 0))
                ga = entry.get("ga", entry.get("goalsAgainst", 0))

            gd  = gf - ga
            pts = entry.get("pts", entry.get("points", w * 3 + d))

            team_rows.append(dict(team=name, mp=mp, w=w, d=d, l=l,
                                  gf=gf, ga=ga, gd=gd, pts=pts))

        if not team_rows:
            continue

        found += 1
        group_standings[key] = team_rows
        teams   = [r["team"] for r in team_rows]
        mp_vals = [r["mp"]   for r in team_rows]

        if any(mp > 0 for mp in mp_vals) and len(teams) >= 2:
            live_standings[key] = [teams[0], teams[1]]

        if len(mp_vals) == 4 and all(mp == 3 for mp in mp_vals) and len(teams) >= 2:
            final_results[key] = [teams[0], teams[1]]

    print(f"Found standings for {found}/12 groups.")
    if found == 0:
        print("WARNING: No group data found. Top-level keys in response:")
        print(list(data.keys()))

    return final_results, live_standings, group_standings


# ── Patch data.js ────────────────────────────────────────────────────────────

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

def patch_data_js(final_results, live_standings, group_standings):
    with open(DATA_JS, "r", encoding="utf-8") as f:
        content = f.read()

    # Patch ACTUAL_RESULTS group block
    new_group_block = build_group_js(final_results)
    pattern = re.compile(r"(  groupA:.*?)(  // Knockout rounds)", re.DOTALL)
    new_content, count = pattern.subn(new_group_block + "\n\n  // Knockout rounds", content)
    if count == 0:
        print("WARNING: Could not find ACTUAL_RESULTS group block in data.js.")
        sys.exit(1)

    # Patch LIVE_STANDINGS block
    live_block = build_group_js(live_standings)
    live_pattern = re.compile(r"(const LIVE_STANDINGS\s*=\s*\{)[^}]*(};)", re.DOTALL)
    new_content, _ = live_pattern.subn(r"\g<1>\n" + live_block + r"\n\g<2>", new_content)

    # Patch GROUP_STANDINGS block using marker comments
    gs_block = build_group_standings_js(group_standings)
    gs_pattern = re.compile(
        r"(// __GROUP_STANDINGS_START__\n).*?(// __GROUP_STANDINGS_END__)",
        re.DOTALL
    )
    new_content, _ = gs_pattern.subn(r"\g<1>" + gs_block + r"\n\g<2>", new_content)

    # Update LAST_UPDATED timestamp
    from datetime import datetime, timezone
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    new_content = re.sub(r'var LAST_UPDATED = ".*?";', f'var LAST_UPDATED = "{ts}";', new_content)

    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("data.js updated successfully.")
    for key in GROUP_KEYS:
        print(f"  {key}: final={final_results[key]}  live={live_standings[key]}  rows={len(group_standings[key])}")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"Fetching standings from Fotmob API (league 77)...")
    try:
        final_results, live_standings, group_standings = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    patch_data_js(final_results, live_standings, group_standings)
