#!/usr/bin/env python3
"""
update_standings.py
Fetches live 2026 World Cup group standings from worldcupwiki.com
and patches ACTUAL_RESULTS, LIVE_STANDINGS, and GROUP_STANDINGS in data.js.

Run by GitHub Actions every hour.
Requires: pip install requests beautifulsoup4
"""

import re
import sys
import requests
from bs4 import BeautifulSoup

URL = "https://worldcupwiki.com/standings/"
DATA_JS = "data.js"

GROUP_KEYS = ["groupA","groupB","groupC","groupD","groupE","groupF",
              "groupG","groupH","groupI","groupJ","groupK","groupL"]

SKIP = {"mp","p","pts","pts.","points","gp","played","team","name",
        "club","#","pos","gf","ga","gd","w","d","l",""}

def safe_int(v):
    try: return int(v)
    except: return 0

# ── Fetch & parse ────────────────────────────────────────────────────────────

def fetch_standings():
    resp = requests.get(URL, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    final_results   = {k: [None, None] for k in GROUP_KEYS}
    live_standings  = {k: [None, None] for k in GROUP_KEYS}
    group_standings = {k: [] for k in GROUP_KEYS}

    headers = soup.find_all(["h2", "h3"])
    found = 0
    for hdr in headers:
        m = re.search(r"Group\s+([A-L])\b", hdr.get_text(), re.IGNORECASE)
        if not m:
            continue
        key = "group" + m.group(1).upper()

        table = hdr.find_next("table")
        if not table:
            continue

        team_rows = []
        for row in table.find_all("tr"):
            cells = [td.get_text(strip=True) for td in row.find_all(["td", "th"])]
            if not cells:
                continue

            # Name is first non-header cell (skip rank col if present)
            name = ""
            for c in cells:
                if c.lower() not in SKIP and not c.isdigit():
                    name = c
                    break
            if not name or name.lower() in SKIP:
                continue

            # worldcupwiki layout: Pos | Team | MP | W | D | L | GF | GA | GD | Pts
            if len(cells) >= 10:
                mp, w, d, l = safe_int(cells[2]), safe_int(cells[3]), safe_int(cells[4]), safe_int(cells[5])
                gf, ga, gd, pts = safe_int(cells[6]), safe_int(cells[7]), safe_int(cells[8]), safe_int(cells[9])
            elif len(cells) >= 9:
                mp, w, d, l = safe_int(cells[1]), safe_int(cells[2]), safe_int(cells[3]), safe_int(cells[4])
                gf, ga, gd, pts = safe_int(cells[5]), safe_int(cells[6]), safe_int(cells[7]), safe_int(cells[8])
            else:
                mp = w = d = l = gf = ga = gd = 0
                pts = safe_int(cells[-1])

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
        print("WARNING: No group data found. Check page structure at", URL)

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

    new_group_block = build_group_js(final_results)
    pattern = re.compile(r"(  groupA:.*?)(  // Knockout rounds)", re.DOTALL)
    new_content, count = pattern.subn(new_group_block + "\n\n  // Knockout rounds", content)
    if count == 0:
        print("WARNING: Could not find ACTUAL_RESULTS group block in data.js.")
        sys.exit(1)

    live_block = build_group_js(live_standings)
    live_pattern = re.compile(r"(const LIVE_STANDINGS\s*=\s*\{)[^}]*(};)", re.DOTALL)
    new_content, _ = live_pattern.subn(r"\g<1>\n" + live_block + r"\n\g<2>", new_content)

    gs_block = build_group_standings_js(group_standings)
    gs_pattern = re.compile(
        r"(// __GROUP_STANDINGS_START__\n).*?(// __GROUP_STANDINGS_END__)",
        re.DOTALL
    )
    new_content, _ = gs_pattern.subn(r"\g<1>" + gs_block + r"\n\g<2>", new_content)

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
    print(f"Fetching standings from {URL} ...")
    try:
        final_results, live_standings, group_standings = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    patch_data_js(final_results, live_standings, group_standings)
