#!/usr/bin/env python3
"""
update_standings.py
Scrapes live 2026 World Cup group standings from FIFA.com using Playwright
(needed because the page is JavaScript-rendered) and patches ACTUAL_RESULTS,
LIVE_STANDINGS, and GROUP_STANDINGS in data.js.

Run by GitHub Actions every hour. Safe to run manually too.
Requires: pip install playwright beautifulsoup4 && playwright install chromium
"""

import re
import sys
from bs4 import BeautifulSoup

URL = "https://www.bing.com/sportsdetails?q=world%20cup%20table&sport=Soccer&scenario=League&TimezoneId=Eastern%20Standard%20Time&IANATimezoneId=America/New_York&ISOTimezoneKey=EDT&league=Soccer_InternationalWorldCup&intent=Standings&seasonyear=2026&segment=sports&isl2=true&form=ANAB01&"
DATA_JS = "data.js"

GROUP_KEYS = ["groupA","groupB","groupC","groupD","groupE","groupF",
              "groupG","groupH","groupI","groupJ","groupK","groupL"]

# ── Fetch & parse ────────────────────────────────────────────────────────────

def parse_int(s, default=0):
    try:
        return int(str(s).strip())
    except (ValueError, AttributeError):
        return default

def fetch_page_html():
    """Use Playwright to render the Bing sports standings page and return the HTML."""
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        page.goto(URL, wait_until="networkidle", timeout=60000)
        # Wait for standings content to appear
        try:
            page.wait_for_selector("table tbody tr, [class*='standing'] tr, [class*='group']", timeout=30000)
        except Exception:
            pass
        html = page.content()
        browser.close()
    return html

def parse_team_rows(table):
    """Extract team stat rows from a standings table element."""
    team_rows = []
    for row in table.find_all("tr"):
        cells = row.find_all("td")
        if len(cells) < 7:
            continue
        # Try to find the team name — skip pure-number or empty cells
        # Bing typically: Rank | Team | GP | W | L | D | GF | GA | GD | Pts
        # or:             Rank | Team | MP | W | D | L | GF | GA | GD | Pts
        team_name = cells[1].get_text(separator=" ", strip=True)
        team_name = re.sub(r"^[\U0001F1E0-\U0001F1FF\U0001F300-\U0001FFFF\s]+", "", team_name).strip()
        team_name = re.sub(r"^\d+\s*", "", team_name).strip()
        if not team_name or team_name.isdigit():
            continue

        nums = []
        for c in cells[2:]:
            txt = c.get_text(strip=True)
            nums.append(parse_int(txt))

        # Need at least 6 numeric columns after team name
        if len(nums) < 6:
            continue

        # Bing column order: GP W D L GF GA [GD] [Pts]
        mp  = nums[0]
        w   = nums[1]
        d   = nums[2]
        l   = nums[3]
        gf  = nums[4]
        ga  = nums[5]
        gd  = gf - ga
        pts = nums[7] if len(nums) > 7 else (nums[6] if len(nums) > 6 and nums[6] != gd else w * 3 + d)

        team_rows.append(dict(team=team_name, mp=mp, w=w, d=d, l=l,
                              gf=gf, ga=ga, gd=gd, pts=pts))
    return team_rows

def fetch_standings():
    """
    Returns (final_results, live_standings, group_standings).
    final_results:   groupX -> [1st, 2nd] only when group fully complete, else [None, None]
    live_standings:  groupX -> [1st, 2nd] based on current standings (None if no matches played)
    group_standings: groupX -> list of {team, mp, w, d, l, gf, ga, gd, pts} for all 4 teams
    """
    html = fetch_page_html()
    soup = BeautifulSoup(html, "html.parser")

    final_results   = {k: [None, None] for k in GROUP_KEYS}
    live_standings  = {k: [None, None] for k in GROUP_KEYS}
    group_standings = {k: [] for k in GROUP_KEYS}

    # Bing renders each group with a heading (h2/h3/h4/div) containing "Group A" etc.
    # followed by a table. Try all heading-like elements.
    all_elements = soup.find_all(["h1","h2","h3","h4","h5","div","span"])
    found_any = False

    for el in all_elements:
        text = el.get_text(strip=True)
        m = re.match(r"^Group\s+([A-L])$", text, re.IGNORECASE)
        if not m:
            continue

        key = "group" + m.group(1).upper()
        # Find the next table sibling or descendant
        table = el.find_next("table")
        if not table:
            continue

        team_rows = parse_team_rows(table)
        if not team_rows:
            continue

        found_any = True
        group_standings[key] = team_rows
        teams   = [r["team"] for r in team_rows]
        mp_vals = [r["mp"]   for r in team_rows]

        if any(mp > 0 for mp in mp_vals) and len(teams) >= 2:
            live_standings[key] = [teams[0], teams[1]]

        if len(mp_vals) == 4 and all(mp == 3 for mp in mp_vals) and len(teams) >= 2:
            final_results[key] = [teams[0], teams[1]]

    if not found_any:
        print("WARNING: No group standings found in page. Check selectors or page structure.")
        print("Page snippet:", soup.get_text()[:2000])

    return final_results, live_standings, group_standings


# ── Patch data.js ────────────────────────────────────────────────────────────

def build_group_js(standings):
    """Build JS lines for all 12 groups (simple [team, team] arrays)."""
    lines = []
    for key in GROUP_KEYS:
        first, second = standings[key]
        if first and second:
            lines.append(f'  {key}: ["{first}", "{second}"],')
        else:
            lines.append(f'  {key}: [null, null],')
    return "\n".join(lines)


def build_group_standings_js(group_standings):
    """Build JS rows for GROUP_STANDINGS between marker comments."""
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

    # Patch LIVE_STANDINGS block (simple arrays, no nested {})
    live_block = build_group_js(live_standings)
    live_pattern = re.compile(r"(const LIVE_STANDINGS\s*=\s*\{)[^}]*(};)", re.DOTALL)
    new_content, live_count = live_pattern.subn(r"\g<1>\n" + live_block + r"\n\g<2>", new_content)
    if live_count == 0:
        print("WARNING: Could not find LIVE_STANDINGS block in data.js.")

    # Patch GROUP_STANDINGS block using marker comments
    gs_block = build_group_standings_js(group_standings)
    gs_pattern = re.compile(
        r"(// __GROUP_STANDINGS_START__\n).*?(// __GROUP_STANDINGS_END__)",
        re.DOTALL
    )
    new_content, gs_count = gs_pattern.subn(r"\g<1>" + gs_block + r"\n\g<2>", new_content)
    if gs_count == 0:
        print("WARNING: Could not find GROUP_STANDINGS markers in data.js.")

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
    print(f"Fetching standings from {URL} ...")
    try:
        final_results, live_standings, group_standings = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    patch_data_js(final_results, live_standings, group_standings)
