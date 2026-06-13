#!/usr/bin/env python3
"""
update_standings.py
Scrapes live 2026 World Cup group standings from worldcupwiki.com
and patches the ACTUAL_RESULTS block in data.js.

Run by GitHub Actions every hour. Safe to run manually too.
"""

import re
import sys
import requests
from bs4 import BeautifulSoup

URL = "https://worldcupwiki.com/standings/"
DATA_JS = "data.js"

GROUP_KEYS = ["groupA","groupB","groupC","groupD","groupE","groupF",
              "groupG","groupH","groupI","groupJ","groupK","groupL"]

# ── Fetch & parse ────────────────────────────────────────────────────────────

def fetch_standings():
    """Returns a dict of groupX -> [1st, 2nd] (strings), or [None, None] if not complete."""
    headers = {"User-Agent": "Mozilla/5.0 (compatible; WC2026Bot/1.0)"}
    resp = requests.get(URL, headers=headers, timeout=15)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    results = {k: [None, None] for k in GROUP_KEYS}

    # Each group is an <h3> like "Group A" followed by a <table>
    headings = soup.find_all("h3")
    for h3 in headings:
        text = h3.get_text(strip=True)
        m = re.match(r"Group\s+([A-L])", text, re.IGNORECASE)
        if not m:
            continue
        key = "group" + m.group(1).upper()
        table = h3.find_next("table")
        if not table:
            continue

        rows = table.find_all("tr")
        teams = []
        for row in rows:
            cells = row.find_all("td")
            if len(cells) < 2:
                continue
            # First cell is position, second contains team name (may have flag emoji/img)
            team_cell = cells[1]
            # Strip flag images, get text
            team_name = team_cell.get_text(separator=" ", strip=True)
            # Remove any leading emoji or flag characters (unicode range)
            team_name = re.sub(r"^[\U0001F1E0-\U0001F1FF\U0001F300-\U0001FFFF\s]+", "", team_name).strip()
            if team_name:
                teams.append(team_name)

        # A group is only "complete" once all 3 matchdays are done (4 teams, each played 3 games).
        # We detect this by checking if every team has 3 matches played.
        # For now: only fill in results if we can confirm the group is finished.
        # We do this by checking the Points column — if all 4 rows have MP=3 we're done.
        mp_cells = []
        for row in rows:
            cells = row.find_all("td")
            if len(cells) >= 3:
                try:
                    mp = int(cells[2].get_text(strip=True))
                    mp_cells.append(mp)
                except ValueError:
                    pass

        group_complete = len(mp_cells) == 4 and all(mp == 3 for mp in mp_cells)

        if group_complete and len(teams) >= 2:
            results[key] = [teams[0], teams[1]]

    return results


# ── Patch data.js ────────────────────────────────────────────────────────────

def build_group_js(standings):
    """Build the JS lines for all 12 groups in ACTUAL_RESULTS."""
    lines = []
    for key in GROUP_KEYS:
        first, second = standings[key]
        if first and second:
            lines.append(f'  {key}: ["{first}", "{second}"],')
        else:
            lines.append(f'  {key}: [null, null],')
    return "\n".join(lines)


def patch_data_js(standings):
    with open(DATA_JS, "r", encoding="utf-8") as f:
        content = f.read()

    new_group_block = build_group_js(standings)

    # Replace the 12 groupX lines inside ACTUAL_RESULTS
    # Pattern matches from groupA: [...] through groupL: [...]
    pattern = re.compile(
        r"(  groupA:.*?)(  // Knockout rounds)",
        re.DOTALL
    )

    replacement = new_group_block + "\n\n  // Knockout rounds"
    new_content, count = pattern.subn(replacement, content)

    if count == 0:
        print("WARNING: Could not find group block in data.js — pattern mismatch.")
        sys.exit(1)

    # Also update LAST_UPDATED timestamp
    from datetime import datetime, timezone
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    new_content = re.sub(
        r'var LAST_UPDATED = ".*?";',
        f'var LAST_UPDATED = "{ts}";',
        new_content
    )

    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(new_content)

    print("data.js updated successfully.")
    for key in GROUP_KEYS:
        print(f"  {key}: {standings[key]}")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print(f"Fetching standings from {URL} ...")
    try:
        standings = fetch_standings()
    except Exception as e:
        print(f"ERROR fetching standings: {e}")
        sys.exit(1)

    patch_data_js(standings)
