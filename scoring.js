// scoring.js — computes scores from BRACKET_PICKS vs ACTUAL_RESULTS

function normalize(team) {
  if (!team) return "";
  var aliases = {
    "czech republic": "czechia",
    "czechia": "czechia",
    "turkey": "turkey",
    "türkiye": "turkey",
    "turkiye": "turkey",
    "ivory coast": "ivory coast",
    "côte d'ivoire": "ivory coast",
    "cote d'ivoire": "ivory coast",
    "dr congo": "dr congo",
    "congo dr": "dr congo",
    "democratic republic of congo": "dr congo",
    "curacao": "curacao",
    "curaçao": "curacao",
    "usa": "united states",
    "south korea": "south korea",
    "korea republic": "south korea",
  };
  var lower = team.toLowerCase().trim();
  return aliases[lower] || lower;
}

function teamsMatch(a, b) {
  return normalize(a) === normalize(b);
}

// Only score a group once both 1st and 2nd place are known
function groupIsComplete(actualGroup) {
  return actualGroup && actualGroup[0] && actualGroup[1];
}

function scoreGroupStage(picks, actual) {
  var groups = ["groupA","groupB","groupC","groupD","groupE","groupF","groupG","groupH","groupI","groupJ","groupK","groupL"];
  var pts = 0, correct = 0, total = 0;
  for (var i = 0; i < groups.length; i++) {
    var g = groups[i];
    var actualGroup = actual[g] || [];
    if (!groupIsComplete(actualGroup)) continue;
    var advancers = actualGroup.filter(Boolean);
    var pickedGroup = (picks.groupStage && picks.groupStage[g]) ? picks.groupStage[g] : [];
    for (var j = 0; j < advancers.length; j++) {
      total += SCORING.groupStage;
      for (var k = 0; k < pickedGroup.length; k++) {
        if (teamsMatch(pickedGroup[k], advancers[j])) { pts += SCORING.groupStage; correct++; break; }
      }
    }
  }
  return { pts: pts, correct: correct, total: total };
}

function scoreRound(picks, actual, roundKey, pointsEach) {
  var pts = 0, correct = 0, total = 0;
  var actualRound = actual[roundKey];
  var pickedRound = picks[roundKey];
  if (!actualRound || !pickedRound) return { pts: pts, correct: correct, total: total };
  var keys = Object.keys(actualRound);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var a = actualRound[key];
    var p = pickedRound[key];
    if (!a) continue;
    total += pointsEach;
    if (p && teamsMatch(p, a)) { pts += pointsEach; correct++; }
  }
  return { pts: pts, correct: correct, total: total };
}

function computeScore(personId) {
  var picks = BRACKET_PICKS[personId];
  if (!picks) return null;

  var gs  = scoreGroupStage(picks, ACTUAL_RESULTS);
  var r32 = scoreRound(picks, ACTUAL_RESULTS, "roundOf32",    SCORING.roundOf32);
  var r16 = scoreRound(picks, ACTUAL_RESULTS, "roundOf16",    SCORING.roundOf16);
  var qf  = scoreRound(picks, ACTUAL_RESULTS, "quarterFinal", SCORING.quarterFinal);
  var sf  = scoreRound(picks, ACTUAL_RESULTS, "semiFinal",    SCORING.semiFinal);

  var champ_pts = 0, champ_correct = 0;
  if (ACTUAL_RESULTS.champion && picks.champion && teamsMatch(picks.champion, ACTUAL_RESULTS.champion)) {
    champ_pts = SCORING.final + SCORING.champion; champ_correct = 1;
  }

  return {
    total: gs.pts + r32.pts + r16.pts + qf.pts + sf.pts + champ_pts,
    breakdown: {
      groupStage:   gs,
      roundOf32:    r32,
      roundOf16:    r16,
      quarterFinal: qf,
      semiFinal:    sf,
      champion:     { pts: champ_pts, correct: champ_correct, total: ACTUAL_RESULTS.champion ? SCORING.final + SCORING.champion : 0 },
    }
  };
}

function getLeaderboard() {
  return PARTICIPANTS
    .map(function(p) { return Object.assign({}, p, { score: computeScore(p.id), champion: (BRACKET_PICKS[p.id] && BRACKET_PICKS[p.id].champion) || "—" }); })
    .filter(function(p) { return p.score; })
    .sort(function(a, b) { return b.score.total - a.score.total; })
    .map(function(p, i) { return Object.assign({}, p, { rank: i + 1 }); });
}
