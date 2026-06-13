// ============================================================
//  WORLD CUP 2026 BRACKET DATA
//  Edit this file to update results and everyone's picks.
//  Source for actual results: worldcupwiki.com/standings
// ============================================================

// REAL GROUP COMPOSITIONS (all 48 teams, 12 groups of 4)
// Group A:  Mexico, South Korea, South Africa, Czechia
// Group B:  Canada, Bosnia and Herzegovina, Qatar, Switzerland
// Group C:  Brazil, Morocco, Haiti, Scotland
// Group D:  United States, Australia, Paraguay, Turkey
// Group E:  Germany, Ecuador, Ivory Coast, Curacao
// Group F:  Netherlands, Japan, Tunisia, Sweden
// Group G:  Belgium, Iran, Egypt, New Zealand
// Group H:  Spain, Uruguay, Saudi Arabia, Cape Verde
// Group I:  France, Senegal, Norway, Iraq
// Group J:  Argentina, Austria, Algeria, Jordan
// Group K:  Portugal, Colombia, Uzbekistan, DR Congo
// Group L:  England, Croatia, Panama, Ghana

var LAST_UPDATED = "never"; // auto-updated by GitHub Actions

const SCORING = {
  groupStage:   1,   // per correct advancing team pick
  roundOf32:    2,
  roundOf16:    3,
  quarterFinal: 5,
  semiFinal:    8,
  final:        10,
  champion:     15,  // bonus on top of 'final' for picking the winner
};

// ── ACTUAL RESULTS ────────────────────────────────────────────
// Fill in as games are played. null = not decided yet.
// For group stage: list the 2 teams that finish 1st and 2nd.
// A group is only scored once BOTH slots are filled.
// Last updated: June 12, 2026 — 2 matches played (Group A matchday 1)
const ACTUAL_RESULTS = {
  groupA: [null, null],
  groupB: [null, null],
  groupC: [null, null],
  groupD: [null, null],
  groupE: [null, null],
  groupF: [null, null],
  groupG: [null, null],
  groupH: [null, null],
  groupI: [null, null],
  groupJ: [null, null],
  groupK: [null, null],
  groupL: [null, null],

  // Knockout rounds — fill in winner of each match slot
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

// ── PARTICIPANTS ──────────────────────────────────────────────
const PARTICIPANTS = [
  { id: "josh", name: "Josh" },
  { id: "sam",  name: "Sam" },
  // Add more players here as you collect their brackets:
  // { id: "alex", name: "Alex" },
];

// ── BRACKET PICKS ─────────────────────────────────────────────
// groupStage: teams picked to finish 1st and 2nd in each group
// roundOf32 through semiFinal: m1–mN = team picked to win that match slot
// champion: team name string
// Use null for rounds not yet filled in.
// ─────────────────────────────────────────────────────────────
const BRACKET_PICKS = {

  josh: {
    groupStage: {
      groupA: ["Czech Republic", "Mexico", "South Korea"],
      groupB: ["Canada", "Switzerland"],
      groupC: ["Brazil", "Morocco", "Scotland"],
      groupD: ["Paraguay", "United States", "Turkey"],
      groupE: ["Germany", "Ecuador"],
      groupF: ["Netherlands", "Japan"],
      groupG: ["Belgium", "Egypt", "New Zealand"],
      groupH: ["Spain", "Uruguay", "Saudi Arabia"],
      groupI: ["France", "Norway", "Senegal"],
      groupJ: ["Argentina", "Algeria", "Austria"],
      groupK: ["Portugal", "Colombia"],
      groupL: ["England", "Croatia", "Ghana"],
    },
    roundOf32: {
      m1:  "Germany",
      m2:  "South Korea",
      m3:  "France",
      m4:  "Turkey",
      m5:  "Mexico",
      m6:  "Switzerland",
      m7:  "Netherlands",
      m8:  "Morocco",
      m9:  "Colombia",
      m10: "Croatia",
      m11: "Spain",
      m12: "Algeria",
      m13: "Paraguay",
      m14: "Senegal",
      m15: "Belgium",
      m16: "Austria",
      m17: "Brazil",
      m18: "Japan",
      m19: "Ecuador",
      m20: "Norway",
      m21: "Czech Republic",
      m22: "Scotland",
      m23: "England",
      m24: "Saudia Arabia",
      m25: "Argentina",
      m26: "Uruguay",
      m27: "United States",
      m28: "Egypt",
      m29: "Canada",
      m30: "New Zealand",
      m31: "Portugal",
      m32: "Ghana", 
    },
    roundOf16: {
      m1: "Germany",
      m2: "France",
      m3: "Switzerland",
      m4: "Netherlands",
      m5: "Colombia",
      m6: "Spain",
      m7: "Paraguay",
      m8: "Belgium",
      m1: "Brazil",
      m2: "Norway",
      m3: "Czech Republic",
      m4: "England",
      m5: "Argentina",
      m6: "United States",
      m7: "Canada",
      m8: "Portugal",
    },
    quarterFinal: {
      m1: "France",
      m2: "Netherlands",
      m3: "Spain",
      m4: "Belgium",
      m1: "Brazil",
      m2: "England",
      m3: "Argentina",
      m4: "Portugal",
    },
    semiFinal: {
      m1: "France",
      m2: "Spain",
      m1: "England",
      m2: "Argentina",
    },
    final: {
      m1: "France",
      m2: "Argentina",
    },
    champion: "France",
  },

  sam: {
    groupStage: {
      groupA: ["Mexico", "South Africa", "Czech Republic"],
      groupB: ["Canada", "Switzerland", "Qatar"],
      groupC: ["Brazil", "Scotland", "Morocco"],
      groupD: ["United States", "Turkey", "Paraguay"],
      groupE: ["Germany", "Ivory Coast", "Ecuador"],
      groupF: ["Netherlands", "Sweden", "Japan"],
      groupG: ["New Zealand", "Iran", "Egypt"],
      groupH: ["Spain", "Uruguay", "Saudi Arabia"],
      groupI: ["France", "Norway"],
      groupJ: ["Argentina", "Austria"],
      groupK: ["Portugal", "Colombia"],
      groupL: ["England", "Ghana"],
    },
    roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null },
    semiFinal:    { m1:null,m2:null },
    champion:     null,
  },

};

// ── LATE ADDITIONS ───────────────────────────────────────────
// Append new players here and also add them to PARTICIPANTS above.

PARTICIPANTS.push({ id: "ryan", name: "Ryan" });

BRACKET_PICKS.ryan = {
  groupStage: {
    groupA: ["Mexico", "South Korea"],
    groupB: ["Canada", "Qatar", "Switzerland"],
    groupC: ["Brazil", "Morocco", "Haiti"],
    groupD: ["United States", "Australia", "Turkey"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Tunisia", "Japan"],
    groupG: ["Egypt", "Belgium"],
    groupH: ["Spain", "Uruguay", "Saudi Arabia"],
    groupI: ["France", "Senegal"],
    groupJ: ["Argentina", "Algeria", "Austria"],
    groupK: ["Colombia", "Portugal"],
    groupL: ["England", "Croatia", "Panama"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "jacob", name: "Jacob" });

BRACKET_PICKS.jacob = {
  groupStage: {
    groupA: ["South Korea", "Mexico", "Czech Republic"],
    groupB: ["Switzerland", "Canada", "Bosnia and Herzegovina"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Turkey", "Australia"],
    groupE: ["Germany", "Ivory Coast", "Ecuador"],
    groupF: ["Netherlands", "Japan", "Tunisia"],
    groupG: ["Belgium", "Iran"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Norway", "Senegal"],
    groupJ: ["Argentina", "Austria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia", "Panama"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "baumann", name: "Baumann" });

BRACKET_PICKS.baumann = {
  groupStage: {
    groupA: ["Mexico", "South Korea", "Czech Republic"],
    groupB: ["Switzerland", "Qatar", "Canada"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Australia", "Turkey"],
    groupE: ["Germany", "Ecuador"],
    groupF: ["Netherlands", "Japan", "Tunisia"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Senegal", "Norway"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "chris", name: "Chris" });

BRACKET_PICKS.chris = {
  groupStage: {
    groupA: ["Mexico", "Czech Republic", "South Korea"],
    groupB: ["Switzerland", "Bosnia and Herzegovina", "Canada"],
    groupC: ["Brazil", "Morocco"],
    groupD: ["United States", "Australia", "Paraguay"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Japan", "Tunisia"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Senegal", "Norway"],
    groupJ: ["Argentina", "Austria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia", "Ghana"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "justin", name: "Justin" });

BRACKET_PICKS.justin = {
  groupStage: {
    groupA: ["Mexico", "South Korea"],
    groupB: ["Canada", "Switzerland", "Bosnia and Herzegovina"],
    groupC: ["Brazil", "Scotland", "Morocco"],
    groupD: ["Paraguay", "Australia", "United States"],
    groupE: ["Ecuador", "Germany", "Ivory Coast"],
    groupF: ["Japan", "Netherlands"],
    groupG: ["Belgium", "New Zealand", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Norway", "Senegal"],
    groupJ: ["Argentina", "Algeria", "Austria"],
    groupK: ["Colombia", "Portugal"],
    groupL: ["England", "Panama", "Ghana"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "ben", name: "Ben" });

BRACKET_PICKS.ben = {
  groupStage: {
    groupA: ["Mexico", "South Korea", "South Africa"],
    groupB: ["Switzerland", "Canada", "Bosnia and Herzegovina"],
    groupC: ["Brazil", "Morocco"],
    groupD: ["Paraguay", "Australia", "United States"],
    groupE: ["Ecuador", "Germany"],
    groupF: ["Netherlands", "Japan", "Sweden"],
    groupG: ["Iran", "Belgium"],
    groupH: ["Spain", "Uruguay", "Saudi Arabia"],
    groupI: ["France", "Norway"],
    groupJ: ["Argentina", "Algeria", "Jordan"],
    groupK: ["Colombia", "DR Congo", "Portugal"],
    groupL: ["Panama", "Croatia", "England"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "zylka", name: "Zylka" });

BRACKET_PICKS.zylka = {
  groupStage: {
    groupA: ["Mexico", "Czech Republic", "South Korea"],
    groupB: ["Switzerland", "Canada"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Turkey", "Australia"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Sweden", "Japan"],
    groupG: ["Belgium", "Egypt", "Iran"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Norway", "Senegal"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "andrew", name: "Andrew" });

BRACKET_PICKS.andrew = {
  groupStage: {
    groupA: ["Mexico", "South Korea", "Czech Republic"],
    groupB: ["Switzerland", "Qatar", "Canada"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Australia", "Turkey"],
    groupE: ["Germany", "Ecuador"],
    groupF: ["Netherlands", "Japan", "Tunisia"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Senegal", "Norway"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "andy", name: "Andy" });

BRACKET_PICKS.andy = {
  groupStage: {
    groupA: ["Mexico", "South Korea", "Czech Republic"],
    groupB: ["Canada", "Switzerland"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Paraguay"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Japan", "Sweden"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Norway", "Senegal"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia", "Panama"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "larry", name: "Larry" });

BRACKET_PICKS.larry = {
  groupStage: {
    groupA: ["Mexico", "Czech Republic", "South Korea"],
    groupB: ["Switzerland", "Canada", "Qatar"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Turkey"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Tunisia", "Sweden"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Senegal", "Norway"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};

PARTICIPANTS.push({ id: "joshz", name: "Josh Z" });

BRACKET_PICKS.joshz = {
  groupStage: {
    groupA: ["Mexico", "Czech Republic", "South Korea"],
    groupB: ["Switzerland", "Canada", "Qatar"],
    groupC: ["Brazil", "Morocco", "Scotland"],
    groupD: ["United States", "Turkey"],
    groupE: ["Germany", "Ecuador", "Ivory Coast"],
    groupF: ["Netherlands", "Tunisia", "Sweden"],
    groupG: ["Belgium", "Iran", "Egypt"],
    groupH: ["Spain", "Uruguay"],
    groupI: ["France", "Senegal", "Norway"],
    groupJ: ["Argentina", "Austria", "Algeria"],
    groupK: ["Portugal", "Colombia"],
    groupL: ["England", "Croatia"],
  },
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null },
  semiFinal:    { m1:null,m2:null },
  champion:     null,
};
