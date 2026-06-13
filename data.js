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

var LAST_UPDATED = "2026-06-13 15:01 UTC"; // auto-updated by GitHub Actions

const SCORING = {
  groupStage:   1,   // per correct advancing team pick
  roundOf32:    1,
  roundOf16:    2,
  quarterFinal: 4,
  semiFinal:    6,
  final:        8,
  champion:     16,  // bonus for picking the winner
};

// ── ACTUAL RESULTS ────────────────────────────────────────────
// Fill in as games are played. null = not decided yet.
// For group stage: list the 2 teams that finish 1st and 2nd.
// A group is only scored once BOTH slots are filled.
const ACTUAL_RESULTS = {
// __ACTUAL_RESULTS_START__
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
// __ACTUAL_RESULTS_END__

  // Knockout rounds — fill in winner of each match slot
  roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
  quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
  semiFinal:    { m1:null,m2:null,m3:null,m4:null },
  champion:     null,
};

// ── LIVE STANDINGS ────────────────────────────────────────────
// Current top 2 per group based on live standings (updated hourly).
// Used to color group stage picks green/red during the group stage.
const LIVE_STANDINGS = {
// __LIVE_STANDINGS_START__
  groupA: ["Mexico", "South Korea"],
  groupB: ["Canada", "Bosnia-Herzegovina"],
  groupC: [null, null],
  groupD: ["United States", "Türkiye"],
  groupE: [null, null],
  groupF: [null, null],
  groupG: [null, null],
  groupH: [null, null],
  groupI: [null, null],
  groupJ: [null, null],
  groupK: [null, null],
  groupL: [null, null],
// __LIVE_STANDINGS_END__
};

// Best 8 third-place teams that currently qualify for the Round of 32
const LIVE_THIRDS = [
// __LIVE_THIRDS_START__
  "Czechia"
// __LIVE_THIRDS_END__
];

// ── GROUP STANDINGS ───────────────────────────────────────────
// Full standings table per group (updated hourly). Each entry:
// {team, mp, w, d, l, gf, ga, gd, pts}
const GROUP_STANDINGS = {
// __GROUP_STANDINGS_START__
  groupA: [{team:"Mexico",mp:1,w:1,d:0,l:0,gf:2,ga:0,gd:2,pts:3},{team:"South Korea",mp:1,w:1,d:0,l:0,gf:2,ga:1,gd:1,pts:3},{team:"Czechia",mp:1,w:0,d:0,l:1,gf:1,ga:2,gd:-1,pts:0},{team:"South Africa",mp:1,w:0,d:0,l:1,gf:0,ga:2,gd:-2,pts:0}],
  groupB: [{team:"Canada",mp:1,w:0,d:1,l:0,gf:1,ga:1,gd:0,pts:1},{team:"Bosnia-Herzegovina",mp:1,w:0,d:1,l:0,gf:1,ga:1,gd:0,pts:1},{team:"Switzerland",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Qatar",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupC: [{team:"Brazil",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Scotland",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Haiti",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Morocco",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupD: [{team:"United States",mp:1,w:1,d:0,l:0,gf:4,ga:1,gd:3,pts:3},{team:"Türkiye",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Australia",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Paraguay",mp:1,w:0,d:0,l:1,gf:1,ga:4,gd:-3,pts:0}],
  groupE: [{team:"Ecuador",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Germany",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Ivory Coast",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Curaçao",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupF: [{team:"Netherlands",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Sweden",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Japan",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Tunisia",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupG: [{team:"Belgium",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Iran",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Egypt",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"New Zealand",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupH: [{team:"Spain",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Uruguay",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Saudi Arabia",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Cape Verde",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupI: [{team:"Norway",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"France",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Senegal",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Iraq",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupJ: [{team:"Argentina",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Austria",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Algeria",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Jordan",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupK: [{team:"Colombia",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Portugal",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Uzbekistan",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Congo DR",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
  groupL: [{team:"England",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Croatia",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Panama",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0},{team:"Ghana",mp:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,pts:0}],
// __GROUP_STANDINGS_END__
};

// ── PARTICIPANTS ──────────────────────────────────────────────
const PARTICIPANTS = [
  { id: "josh",   name: "Josh" },
  { id: "sam",    name: "Sam" },
  { id: "ryan",   name: "Ryan" },
  { id: "jacob",  name: "Jacob" },
  { id: "baumann",name: "Baumann" },
  { id: "chris",  name: "Chris" },
  { id: "justin", name: "Justin" },
  { id: "ben",    name: "Ben" },
  { id: "zylka",  name: "Zylka" },
  { id: "andrew", name: "Andrew" },
  { id: "andy",   name: "Andy" },
  { id: "larry",  name: "Larry" },
  { id: "joshz",  name: "Josh Z" },
  { id: "jackie", name: "Jackie" },
  { id: "jamie",  name: "Jamie" },
  { id: "dad",    name: "Dad" },
];

// ── BRACKET PICKS ─────────────────────────────────────────────
// groupStage: teams picked to finish 1st and 2nd in each group
// roundOf32 through semiFinal: m1–mN = team picked to win that match slot
// champion: team name string, null if not filled in
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
      m1:"Germany", m2:"South Korea", m3:"France", m4:"Turkey",
      m5:"Mexico", m6:"Switzerland", m7:"Netherlands", m8:"Morocco",
      m9:"Colombia", m10:"Croatia", m11:"Spain", m12:"Algeria",
      m13:"Paraguay", m14:"Senegal", m15:"Belgium", m16:"Austria",
      m17:"Brazil", m18:"Japan", m19:"Ecuador", m20:"Norway",
      m21:"Czech Republic", m22:"Scotland", m23:"England", m24:"Saudi Arabia",
      m25:"Argentina", m26:"Uruguay", m27:"United States", m28:"Egypt",
      m29:"Canada", m30:"New Zealand", m31:"Portugal", m32:"Ghana",
    },
    roundOf16: { m1:"Germany", m2:"France", m3:"Switzerland", m4:"Netherlands", m5:"Colombia", m6:"Spain", m7:"Czech Republic", m8:"England", m9:"Brazil", m10:"Norway", m11:"Paraguay", m12:"Belgium", m13:"Argentina", m14:"United States", m15:"Canada", m16:"Portugal" },
    quarterFinal: { m1:"France", m2:"Netherlands", m3:"Spain", m4:"Belgium", m5:"Brazil", m6:"England", m7:"Argentina", m8:"Portugal" },
    semiFinal:    { m1:"France", m2:"Spain", m3:"England", m4:"Argentina" },
    final:        { m1:"France", m2:"Argentina" },
    champion:     "France",
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Brazil",
  },

  ryan: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Brazil",
  },

  jacob: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "France",
  },

  baumann: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Portugal",
  },

  chris: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Spain",
  },

  justin: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Brazil",
  },

  ben: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Argentina",
  },

  zylka: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Spain",
  },

  andrew: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "United States",
  },

  andy: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Spain",
  },

  larry: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "France",
  },

  joshz: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "France",
  },

  jackie: {
    groupStage: {
      groupA: ["South Korea", "Mexico", "Czech Republic"],
      groupB: ["Switzerland", "Canada", "Bosnia and Herzegovina"],
      groupC: ["Brazil", "Scotland", "Haiti"],
      groupD: ["United States", "Australia", "Paraguay"],
      groupE: ["Germany", "Ecuador"],
      groupF: ["Sweden", "Netherlands", "Japan"],
      groupG: ["New Zealand", "Belgium", "Egypt"],
      groupH: ["Spain", "Uruguay"],
      groupI: ["Norway", "France", "Senegal"],
      groupJ: ["Argentina", "Austria"],
      groupK: ["Colombia", "Portugal"],
      groupL: ["England", "Croatia", "Ghana"],
    },
    roundOf32:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Norway",
  },

  jamie: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Ecuador",
  },

  dad: {
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
    roundOf16:    { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null,m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null },
    quarterFinal: { m1:null,m2:null,m3:null,m4:null,m5:null,m6:null,m7:null,m8:null },
    semiFinal:    { m1:null,m2:null,m3:null,m4:null },
    champion:     "Mexico",
  },

};
