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

URL = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/standings"
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
    """Use Playwright to render the FIFA standings page and return the HTML."""
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(URL, wait_until="networkidle", timeout=60000)
        # Wait for at least one standings table row to appear
        try:
            page.wait_for_selector("table tbody tr", timeout=30000)
        except Exception:
            pass
        html = page.content()
        browser.close()
    return html

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

    # FIFA renders each group in a section with a heading containing "Group A", "Group B", etc.
    # Try multiple heading levels since FIFA's markup can vary.
    for level in ["h2", "h3", "h4", "[class*='group']"]:
        headings = soup.select(level) if level.startswith("[") else soup.find_all(level)
        matched = False
        for heading in headings:
            text = heading.get_text(strip=True)
            m = re.search(r"Group\s+([A-L])\b", text, re.IGNORECASE)
            if not m:
                continue
            matched = True
            key = "group" + m.group(1).upper()

            # Find the nearest table after this heading
            table = heading.find_next("table")
            if not table:
                continue

            rows = table.find_all("tr")
            team_rows = []
            for row in rows:
                cells = row.find_all("td")
                if len(cells) < 8:
                    continue

                # FIFA table columns: Pos | Team | MP | W | D | L | GF | GA | GD | Pts
                # Team name may be in a nested element; strip flags/images
                team_cell = cells[1]
                team_name = team_cell.get_text(separator=" ", strip=True)
                # Remove flag emoji / unicode symbols at the start
                team_name = re.sub(r"^[\U0001F1E0-\U0001F1FF\U0001F300-\U0001FFFF\s]+", "", team_name).strip()
                # Also strip any leading numbers (position column sometimes bleeds in)
                team_name = re.sub(r"^\d+\s*", "", team_name).strip()
                if not team_name:
                    continue

                mp  = parse_int(cells[2].get_text())
                w   = parse_int(cells[3].get_text())
                d   = parse_int(cells[4].get_text())
                l   = parse_int(cells[5].get_text())
                gf  = parse_int(cells[6].get_text())
                ga  = parse_int(cells[7].get_text())
                gd  = gf - ga
                pts = parse_int(cells[9].get_text()) if len(cells) > 9 else w * 3 + d
                team_rows.append(dict(team=team_name, mp=mp, w=w, d=d, l=l,
                                      gf=gf, ga=ga, gd=gd, pts=pts))

            if team_rows:
                group_standings[key] = team_rows
                teams   = [r["team"] for r in team_rows]
                mp_vals = [r["mp"]   for r in team_rows]

                if any(mp > 0 for mp in mp_vals) and len(teams) >= 2:
                    live_standings[key] = [teams[0], teams[1]]

                if len(mp_vals) == 4 and all(mp == 3 for mp in mp_vals) and len(teams) >= 2:
                    final_results[key] = [teams[0], teams[1]]

        if matched:
            break  # found groups with this heading level, stop trying others

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
