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

var LAST_UPDATED = "2026-07-14 10:48 UTC"; // auto-updated by GitHub Actions

const SCORING = {
  groupStage:   1,   // per correct advancing team pick
  roundOf32:    2,   // correctly predicting who advances to R16
  roundOf16:    4,   // correctly predicting who advances to Elite 8
  quarterFinal: 8,   // correctly predicting who advances to Final 4
  semiFinal:    10,  // correctly predicting who advances to the Final
  final:        0,   // display only — covered by semiFinal scoring
  champion:     15,  // bonus for picking the winner
};

// ── ACTUAL RESULTS ────────────────────────────────────────────
// Fill in as games are played. null = not decided yet.
// For group stage: list the 2 teams that finish 1st and 2nd.
// A group is only scored once BOTH slots are filled.
const ACTUAL_RESULTS = {
// __ACTUAL_RESULTS_START__
  groupA: ["Mexico", "South Africa"],
  groupB: ["Switzerland", "Canada"],
  groupC: ["Brazil", "Morocco"],
  groupD: ["United States", "Australia"],
  groupE: ["Germany", "Ivory Coast"],
  groupF: ["Netherlands", "Japan"],
  groupG: ["Belgium", "Egypt"],
  groupH: ["Spain", "Cape Verde"],
  groupI: ["France", "Norway"],
  groupJ: ["Argentina", "Austria"],
  groupK: ["Colombia", "Portugal"],
  groupL: ["England", "Croatia"],
// __ACTUAL_RESULTS_END__

  // Knockout rounds — winners populated by CI
// __KNOCKOUT_RESULTS_START__
  roundOf32:    {m1:"Canada",m2:"Brazil",m3:"Paraguay",m4:"Morocco",m5:"Norway",m6:"France",m7:"Mexico",m8:"England",m9:"Belgium",m10:"United States",m11:"Spain",m12:"Portugal",m13:"Switzerland",m14:"Egypt",m15:"Argentina",m16:"Colombia"},
  roundOf16:    {m1:"Morocco",m2:"France",m3:"Norway",m4:"England",m5:"Spain",m6:"Belgium",m7:"Argentina",m8:"Switzerland",m9:null,m10:null,m11:null,m12:null,m13:null,m14:null,m15:null,m16:null},
  quarterFinal:    {m1:"France",m2:"Spain",m3:"England",m4:"Argentina",m5:null,m6:null,m7:null,m8:null},
  semiFinal:    {m1:null,m2:null,m3:null,m4:null},
  final:    {m1:null,m2:null},
  champion:     null,
// __KNOCKOUT_RESULTS_END__
};

// ── ACTUAL MATCHUPS ───────────────────────────────────────────
// Full bracket pairs per round: [{a, b, winner}]
// Populated by CI — used to render the WC Table bracket correctly.
const ACTUAL_MATCHUPS = {
// __ACTUAL_MATCHUPS_START__
  roundOf32:    [{"a":"South Africa","b":"Canada","winner":"Canada","scoreA":"0","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Brazil","b":"Japan","winner":"Brazil","scoreA":"2","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Germany","b":"Paraguay","winner":"Paraguay","scoreA":"1","scoreB":"1","shootout":true,"shootoutA":3,"shootoutB":4},{"a":"Netherlands","b":"Morocco","winner":"Morocco","scoreA":"1","scoreB":"1","shootout":true,"shootoutA":2,"shootoutB":3},{"a":"Ivory Coast","b":"Norway","winner":"Norway","scoreA":"1","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"France","b":"Sweden","winner":"France","scoreA":"3","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Mexico","b":"Ecuador","winner":"Mexico","scoreA":"2","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"England","b":"Congo DR","winner":"England","scoreA":"2","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Belgium","b":"Senegal","winner":"Belgium","scoreA":"3","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"United States","b":"Bosnia-Herzegovina","winner":"United States","scoreA":"2","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Spain","b":"Austria","winner":"Spain","scoreA":"3","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Portugal","b":"Croatia","winner":"Portugal","scoreA":"2","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Switzerland","b":"Algeria","winner":"Switzerland","scoreA":"2","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Australia","b":"Egypt","winner":"Egypt","scoreA":"1","scoreB":"1","shootout":true,"shootoutA":2,"shootoutB":4},{"a":"Argentina","b":"Cape Verde","winner":"Argentina","scoreA":"3","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Colombia","b":"Ghana","winner":"Colombia","scoreA":"1","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null}],
  roundOf16:    [{"a":"Canada","b":"Morocco","winner":"Morocco","scoreA":"0","scoreB":"3","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Paraguay","b":"France","winner":"France","scoreA":"0","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Brazil","b":"Norway","winner":"Norway","scoreA":"1","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Mexico","b":"England","winner":"England","scoreA":"2","scoreB":"3","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Portugal","b":"Spain","winner":"Spain","scoreA":"0","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"United States","b":"Belgium","winner":"Belgium","scoreA":"1","scoreB":"4","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Argentina","b":"Egypt","winner":"Argentina","scoreA":"3","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Switzerland","b":"Colombia","winner":"Switzerland","scoreA":"0","scoreB":"0","shootout":true,"shootoutA":4,"shootoutB":3}],
  quarterFinal:    [{"a":"France","b":"Morocco","winner":"France","scoreA":"2","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Spain","b":"Belgium","winner":"Spain","scoreA":"2","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Norway","b":"England","winner":"England","scoreA":"1","scoreB":"2","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"Argentina","b":"Switzerland","winner":"Argentina","scoreA":"3","scoreB":"1","shootout":false,"shootoutA":null,"shootoutB":null}],
  semiFinal:    [{"a":"France","b":"Spain","winner":null,"scoreA":"0","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null},{"a":"England","b":"Argentina","winner":null,"scoreA":"0","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null}],
  final:    [{"a":"Semifinal 1 Winner","b":"Semifinal 2 Winner","winner":null,"scoreA":"0","scoreB":"0","shootout":false,"shootoutA":null,"shootoutB":null}],
// __ACTUAL_MATCHUPS_END__
};

// ── LIVE STANDINGS ────────────────────────────────────────────
// Current top 2 per group based on live standings (updated hourly).
// Used to color group stage picks green/red during the group stage.
const LIVE_STANDINGS = {
// __LIVE_STANDINGS_START__
  groupA: ["Mexico", "South Africa"],
  groupB: ["Switzerland", "Canada"],
  groupC: ["Brazil", "Morocco"],
  groupD: ["United States", "Australia"],
  groupE: ["Germany", "Ivory Coast"],
  groupF: ["Netherlands", "Japan"],
  groupG: ["Belgium", "Egypt"],
  groupH: ["Spain", "Cape Verde"],
  groupI: ["France", "Norway"],
  groupJ: ["Argentina", "Austria"],
  groupK: ["Colombia", "Portugal"],
  groupL: ["England", "Croatia"],
// __LIVE_STANDINGS_END__
};

// Best 8 third-place teams that currently qualify for the Round of 32
const LIVE_THIRDS = [
// __LIVE_THIRDS_START__
  "Congo DR", "Sweden", "Ecuador", "Ghana", "Bosnia-Herzegovina", "Algeria", "Paraguay", "Senegal"
// __LIVE_THIRDS_END__
];

// ── GROUP STANDINGS ───────────────────────────────────────────
// Full standings table per group (updated hourly). Each entry:
// {team, mp, w, d, l, gf, ga, gd, pts}
const GROUP_STANDINGS = {
// __GROUP_STANDINGS_START__
  groupA: [{team:"Mexico",mp:3,w:3,d:0,l:0,gf:6,ga:0,gd:6,pts:9},{team:"South Africa",mp:3,w:1,d:1,l:1,gf:2,ga:3,gd:-1,pts:4},{team:"South Korea",mp:3,w:1,d:0,l:2,gf:2,ga:3,gd:-1,pts:3},{team:"Czechia",mp:3,w:0,d:1,l:2,gf:2,ga:6,gd:-4,pts:1}],
  groupB: [{team:"Switzerland",mp:3,w:2,d:1,l:0,gf:7,ga:3,gd:4,pts:7},{team:"Canada",mp:3,w:1,d:1,l:1,gf:8,ga:3,gd:5,pts:4},{team:"Bosnia-Herzegovina",mp:3,w:1,d:1,l:1,gf:5,ga:6,gd:-1,pts:4},{team:"Qatar",mp:3,w:0,d:1,l:2,gf:2,ga:10,gd:-8,pts:1}],
  groupC: [{team:"Brazil",mp:3,w:2,d:1,l:0,gf:7,ga:1,gd:6,pts:7},{team:"Morocco",mp:3,w:2,d:1,l:0,gf:6,ga:3,gd:3,pts:7},{team:"Scotland",mp:3,w:1,d:0,l:2,gf:1,ga:4,gd:-3,pts:3},{team:"Haiti",mp:3,w:0,d:0,l:3,gf:2,ga:8,gd:-6,pts:0}],
  groupD: [{team:"United States",mp:3,w:2,d:0,l:1,gf:8,ga:4,gd:4,pts:6},{team:"Australia",mp:3,w:1,d:1,l:1,gf:2,ga:2,gd:0,pts:4},{team:"Paraguay",mp:3,w:1,d:1,l:1,gf:2,ga:4,gd:-2,pts:4},{team:"Türkiye",mp:3,w:1,d:0,l:2,gf:3,ga:5,gd:-2,pts:3}],
  groupE: [{team:"Germany",mp:3,w:2,d:0,l:1,gf:10,ga:4,gd:6,pts:6},{team:"Ivory Coast",mp:3,w:2,d:0,l:1,gf:4,ga:2,gd:2,pts:6},{team:"Ecuador",mp:3,w:1,d:1,l:1,gf:2,ga:2,gd:0,pts:4},{team:"Curaçao",mp:3,w:0,d:1,l:2,gf:1,ga:9,gd:-8,pts:1}],
  groupF: [{team:"Netherlands",mp:3,w:2,d:1,l:0,gf:10,ga:4,gd:6,pts:7},{team:"Japan",mp:3,w:1,d:2,l:0,gf:7,ga:3,gd:4,pts:5},{team:"Sweden",mp:3,w:1,d:1,l:1,gf:7,ga:7,gd:0,pts:4},{team:"Tunisia",mp:3,w:0,d:0,l:3,gf:2,ga:12,gd:-10,pts:0}],
  groupG: [{team:"Belgium",mp:3,w:1,d:2,l:0,gf:6,ga:2,gd:4,pts:5},{team:"Egypt",mp:3,w:1,d:2,l:0,gf:5,ga:3,gd:2,pts:5},{team:"Iran",mp:3,w:0,d:3,l:0,gf:3,ga:3,gd:0,pts:3},{team:"New Zealand",mp:3,w:0,d:1,l:2,gf:4,ga:10,gd:-6,pts:1}],
  groupH: [{team:"Spain",mp:3,w:2,d:1,l:0,gf:5,ga:0,gd:5,pts:7},{team:"Cape Verde",mp:3,w:0,d:3,l:0,gf:2,ga:2,gd:0,pts:3},{team:"Uruguay",mp:3,w:0,d:2,l:1,gf:3,ga:4,gd:-1,pts:2},{team:"Saudi Arabia",mp:3,w:0,d:2,l:1,gf:1,ga:5,gd:-4,pts:2}],
  groupI: [{team:"France",mp:3,w:3,d:0,l:0,gf:10,ga:2,gd:8,pts:9},{team:"Norway",mp:3,w:2,d:0,l:1,gf:8,ga:7,gd:1,pts:6},{team:"Senegal",mp:3,w:1,d:0,l:2,gf:8,ga:6,gd:2,pts:3},{team:"Iraq",mp:3,w:0,d:0,l:3,gf:1,ga:12,gd:-11,pts:0}],
  groupJ: [{team:"Argentina",mp:3,w:3,d:0,l:0,gf:8,ga:1,gd:7,pts:9},{team:"Austria",mp:3,w:1,d:1,l:1,gf:6,ga:6,gd:0,pts:4},{team:"Algeria",mp:3,w:1,d:1,l:1,gf:5,ga:7,gd:-2,pts:4},{team:"Jordan",mp:3,w:0,d:0,l:3,gf:3,ga:8,gd:-5,pts:0}],
  groupK: [{team:"Colombia",mp:3,w:2,d:1,l:0,gf:4,ga:1,gd:3,pts:7},{team:"Portugal",mp:3,w:1,d:2,l:0,gf:6,ga:1,gd:5,pts:5},{team:"Congo DR",mp:3,w:1,d:1,l:1,gf:4,ga:3,gd:1,pts:4},{team:"Uzbekistan",mp:3,w:0,d:0,l:3,gf:2,ga:11,gd:-9,pts:0}],
  groupL: [{team:"England",mp:3,w:2,d:1,l:0,gf:6,ga:2,gd:4,pts:7},{team:"Croatia",mp:3,w:2,d:0,l:1,gf:5,ga:5,gd:0,pts:6},{team:"Ghana",mp:3,w:1,d:1,l:1,gf:2,ga:2,gd:0,pts:4},{team:"Panama",mp:3,w:0,d:0,l:3,gf:0,ga:4,gd:-4,pts:0}],
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
    roundOf32:    { m1:"Germany",m2:"Morocco",m3:"France",m4:"Egypt",m5:"South Africa",m6:"Switzerland",m7:"Netherlands",m8:"Scotland",m9:"Colombia",m10:"Ghana",m11:"Spain",m12:"Austria",m13:"United States",m14:"Qatar",m15:"New Zealand",m16:"Czech Republic",m17:"Brazil",m18:"Sweden",m19:"Ivory Coast",m20:"Norway",m21:"Mexico",m22:"Saudi Arabia",m23:"England",m24:"Ecuador",m25:"Argentina",m26:"Uruguay",m27:"Turkey",m28:"Iran",m29:"Canada",m30:"Japan",m31:"Portugal",m32:"Paraguay" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Africa",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"New Zealand",m9:"Brazil",m10:"Ivory Coast",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Turkey",m15:"Canada",m16:"Portugal" },
    quarterFinal: { m1:"Germany",m2:"South Africa",m3:"Colombia",m4:"United States",m5:"Brazil",m6:"Mexico",m7:"Argentina",m8:"Canada" },
    semiFinal:    { m1:"Germany",m2:"Colombia",m3:"Brazil",m4:"Argentina" },
    final:        { m1:"Colombia",m2:"Brazil" },
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
    roundOf32:    { m1:"Germany",m2:"Switzerland",m3:"France",m4:"Turkey",m5:"South Korea",m6:"Qatar",m7:"Netherlands",m8:"Morocco",m9:"Portugal",m10:"Croatia",m11:"Spain",m12:"Algeria",m13:"United States",m14:"Austria",m15:"Egypt",m16:"Ivory Coast",m17:"Brazil",m18:"Tunisia",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Haiti",m23:"England",m24:"Saudi Arabia",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Belgium",m29:"Canada",m30:"Japan",m31:"Colombia",m32:"Panama" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Korea",m4:"Morocco",m5:"Portugal",m6:"Spain",m7:"United States",m8:"Egypt",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Canada",m16:"Colombia" },
    quarterFinal: { m1:"France",m2:"Morocco",m3:"Spain",m4:"United States",m5:"Brazil",m6:"Mexico",m7:"Australia",m8:"Canada" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"Brazil",m4:"Australia" },
    final:        { m1:"France",m2:"Brazil" },
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
    roundOf32:    { m1:"Germany",m2:"Australia",m3:"France",m4:"Scotland",m5:"Mexico",m6:"Canada",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Bosnia and Herzegovina",m15:"Belgium",m16:"Czech Republic",m17:"Brazil",m18:"Japan",m19:"Ivory Coast",m20:"Norway",m21:"South Korea",m22:"Senegal",m23:"England",m24:"Ecuador",m25:"Argentina",m26:"Uruguay",m27:"Turkey",m28:"Iran",m29:"Switzerland",m30:"Tunisia",m31:"Portugal",m32:"Panama" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Mexico",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Norway",m11:"South Korea",m12:"England",m13:"Argentina",m14:"Turkey",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"Brazil",m4:"Argentina" },
    final:        { m1:"France",m2:"Brazil" },
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
    roundOf32:    { m1:"Germany",m2:"Canada",m3:"France",m4:"Tunisia",m5:"South Korea",m6:"Qatar",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Algeria",m15:"Belgium",m16:"Czech Republic",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Scotland",m23:"England",m24:"Norway",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Turkey" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Korea",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"United States",m5:"Brazil",m6:"Mexico",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"Brazil",m4:"Portugal" },
    final:        { m1:"Spain",m2:"Portugal" },
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
    roundOf32:    { m1:"Germany",m2:"Canada",m3:"France",m4:"Paraguay",m5:"Czech Republic",m6:"Bosnia and Herzegovina",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Norway",m15:"Belgium",m16:"South Korea",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Tunisia",m23:"England",m24:"Ivory Coast",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Ghana" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Czech Republic",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"United States",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"England",m4:"Argentina" },
    final:        { m1:"Spain",m2:"Argentina" },
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
    roundOf32:    { m1:"Ecuador",m2:"Bosnia and Herzegovina",m3:"France",m4:"United States",m5:"South Korea",m6:"Switzerland",m7:"Japan",m8:"Scotland",m9:"Portugal",m10:"Panama",m11:"Spain",m12:"Algeria",m13:"Paraguay",m14:"Austria",m15:"Belgium",m16:"Ivory Coast",m17:"Brazil",m18:"Netherlands",m19:"Germany",m20:"Norway",m21:"Mexico",m22:"Morocco",m23:"England",m24:"Senegal",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"New Zealand",m29:"Canada",m30:"Egypt",m31:"Colombia",m32:"Ghana" },
    roundOf16:    { m1:"Ecuador",m2:"France",m3:"South Korea",m4:"Japan",m5:"Panama",m6:"Spain",m7:"Paraguay",m8:"Ivory Coast",m9:"Brazil",m10:"Germany",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Canada",m16:"Colombia" },
    quarterFinal: { m1:"France",m2:"Japan",m3:"Spain",m4:"Paraguay",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Canada" },
    semiFinal:    { m1:"Japan",m2:"Spain",m3:"Brazil",m4:"Argentina" },
    final:        { m1:"Spain",m2:"Brazil" },
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
    roundOf32:    { m1:"Ecuador",m2:"South Africa",m3:"France",m4:"United States",m5:"South Korea",m6:"Canada",m7:"Netherlands",m8:"Morocco",m9:"DR Congo",m10:"Croatia",m11:"Spain",m12:"Algeria",m13:"Paraguay",m14:"Bosnia and Herzegovina",m15:"Iran",m16:"Saudi Arabia",m17:"Brazil",m18:"Japan",m19:"Germany",m20:"Norway",m21:"Mexico",m22:"Sweden",m23:"Panama",m24:"Portugal",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Belgium",m29:"Switzerland",m30:"Jordan",m31:"Colombia",m32:"England" },
    roundOf16:    { m1:"Ecuador",m2:"France",m3:"South Korea",m4:"Netherlands",m5:"Croatia",m6:"Spain",m7:"Paraguay",m8:"Saudi Arabia",m9:"Brazil",m10:"Germany",m11:"Mexico",m12:"Panama",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Colombia" },
    quarterFinal: { m1:"France",m2:"South Korea",m3:"Croatia",m4:"Paraguay",m5:"Brazil",m6:"Mexico",m7:"Argentina",m8:"Colombia" },
    semiFinal:    { m1:"South Korea",m2:"Croatia",m3:"Mexico",m4:"Argentina" },
    final:        { m1:"South Korea",m2:"Argentina" },
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
    roundOf32:    { m1:"Germany",m2:"South Korea",m3:"France",m4:"Scotland",m5:"Czech Republic",m6:"Canada",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Japan",m15:"Belgium",m16:"Algeria",m17:"Brazil",m18:"Sweden",m19:"Ecuador",m20:"Norway",m21:"Mexico",m22:"Senegal",m23:"England",m24:"Ivory Coast",m25:"Argentina",m26:"Uruguay",m27:"Turkey",m28:"Egypt",m29:"Switzerland",m30:"Iran",m31:"Portugal",m32:"Australia" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Czech Republic",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Senegal",m12:"England",m13:"Argentina",m14:"Turkey",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"Germany",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"Netherlands",m2:"Spain",m3:"England",m4:"Argentina" },
    final:        { m1:"Spain",m2:"England" },
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
    roundOf32:    { m1:"Germany",m2:"Canada",m3:"France",m4:"Tunisia",m5:"South Korea",m6:"Qatar",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Algeria",m15:"Belgium",m16:"Czech Republic",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Scotland",m23:"England",m24:"Norway",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Turkey" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Korea",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Czech Republic",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"United States",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"United States",m3:"Brazil",m4:"Argentina" },
    final:        { m1:"United States",m2:"Argentina" },
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
    roundOf32:    { m1:"Germany",m2:"Czech Republic",m3:"France",m4:"Scotland",m5:"South Korea",m6:"Switzerland",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Sweden",m15:"Belgium",m16:"Algeria",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Norway",m21:"Mexico",m22:"Senegal",m23:"England",m24:"Ivory Coast",m25:"Argentina",m26:"Uruguay",m27:"Paraguay",m28:"Iran",m29:"Canada",m30:"Egypt",m31:"Portugal",m32:"Panama" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Korea",m4:"Morocco",m5:"Croatia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Senegal",m12:"England",m13:"Argentina",m14:"Iran",m15:"Canada",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Morocco",m3:"Spain",m4:"Belgium",m5:"Ecuador",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"England",m4:"Argentina" },
    final:        { m1:"Spain",m2:"England" },
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
    roundOf32:    { m1:"Germany",m2:"South Korea",m3:"France",m4:"Scotland",m5:"Czech Republic",m6:"Canada",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Qatar",m15:"Belgium",m16:"Algeria",m17:"Brazil",m18:"Tunisia",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Sweden",m23:"England",m24:"Ivory Coast",m25:"Argentina",m26:"Uruguay",m27:"Turkey",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Norway" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Czech Republic",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Senegal",m11:"Mexico",m12:"England",m13:"Uruguay",m14:"Turkey",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Brazil",m6:"England",m7:"Uruguay",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"England",m4:"Uruguay" },
    final:        { m1:"France",m2:"England" },
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
    roundOf32:    { m1:"Germany",m2:"South Korea",m3:"France",m4:"Scotland",m5:"Czech Republic",m6:"Canada",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Qatar",m15:"Belgium",m16:"Algeria",m17:"Brazil",m18:"Tunisia",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Sweden",m23:"England",m24:"Ivory Coast",m25:"Argentina",m26:"Uruguay",m27:"Turkey",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Norway" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Czech Republic",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Senegal",m11:"Mexico",m12:"England",m13:"Uruguay",m14:"Turkey",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Brazil",m6:"England",m7:"Uruguay",m8:"Portugal" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"England",m4:"Uruguay" },
    final:        { m1:"France",m2:"England" },
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
    roundOf32:    { m1:"Germany",m2:"Paraguay",m3:"Norway",m4:"Egypt",m5:"Mexico",m6:"Canada",m7:"Sweden",m8:"Scotland",m9:"Portugal",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Bosnia and Herzegovina",m15:"New Zealand",m16:"Czech Republic",m17:"Brazil",m18:"Netherlands",m19:"Ecuador",m20:"France",m21:"South Korea",m22:"Haiti",m23:"England",m24:"Senegal",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Belgium",m29:"Switzerland",m30:"Japan",m31:"Colombia",m32:"Ghana" },
    roundOf16:    { m1:"Germany",m2:"Norway",m3:"Mexico",m4:"Sweden",m5:"Portugal",m6:"Spain",m7:"United States",m8:"New Zealand",m9:"Brazil",m10:"France",m11:"South Korea",m12:"England",m13:"Argentina",m14:"Belgium",m15:"Switzerland",m16:"Colombia" },
    quarterFinal: { m1:"Norway",m2:"Mexico",m3:"Spain",m4:"United States",m5:"Brazil",m6:"England",m7:"Argentina",m8:"Colombia" },
    semiFinal:    { m1:"Norway",m2:"United States",m3:"Brazil",m4:"Argentina" },
    final:        { m1:"Norway",m2:"Argentina" },
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
    roundOf32:    { m1:"Germany",m2:"Canada",m3:"France",m4:"Tunisia",m5:"South Korea",m6:"Qatar",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Algeria",m15:"Belgium",m16:"Czech Republic",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Scotland",m23:"England",m24:"Norway",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Turkey" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"South Korea",m4:"Netherlands",m5:"Colombia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"England",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Portugal" },
    quarterFinal: { m1:"Germany",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Ecuador",m6:"England",m7:"Argentina",m8:"Portugal" },
    semiFinal:    { m1:"Germany",m2:"Spain",m3:"Ecuador",m4:"Argentina" },
    final:        { m1:"Germany",m2:"Ecuador" },
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
    roundOf32:    { m1:"Germany",m2:"Canada",m3:"France",m4:"Tunisia",m5:"South Korea",m6:"Qatar",m7:"Netherlands",m8:"Morocco",m9:"Colombia",m10:"Croatia",m11:"Spain",m12:"Austria",m13:"United States",m14:"Algeria",m15:"Belgium",m16:"Czech Republic",m17:"Brazil",m18:"Japan",m19:"Ecuador",m20:"Senegal",m21:"Mexico",m22:"Scotland",m23:"England",m24:"Norway",m25:"Argentina",m26:"Uruguay",m27:"Australia",m28:"Iran",m29:"Switzerland",m30:"Egypt",m31:"Portugal",m32:"Turkey" },
    roundOf16:    { m1:"Germany",m2:"France",m3:"Qatar",m4:"Netherlands",m5:"Croatia",m6:"Spain",m7:"United States",m8:"Belgium",m9:"Brazil",m10:"Ecuador",m11:"Mexico",m12:"Norway",m13:"Argentina",m14:"Australia",m15:"Switzerland",m16:"Turkey" },
    quarterFinal: { m1:"France",m2:"Netherlands",m3:"Spain",m4:"Belgium",m5:"Brazil",m6:"Mexico",m7:"Argentina",m8:"Turkey" },
    semiFinal:    { m1:"France",m2:"Spain",m3:"Mexico",m4:"Argentina" },
    final:        { m1:"France",m2:"Mexico" },
    champion:     "Mexico",
  },

};
