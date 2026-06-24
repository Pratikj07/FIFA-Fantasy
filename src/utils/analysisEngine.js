import { TEAMS } from '../data/teams.js';
import { TEAM_ANALYSIS } from '../data/teamAnalysis.js';

/* ── Score prediction ─────────────────────────────────────────────────────── */
function predictScore(homeStr, awayStr, homeRank, awayRank) {
  const diff = (homeStr - awayStr) + (awayRank - homeRank) * 0.15;
  let hg, ag;
  if (diff >= 4)       { hg=3; ag=0; }
  else if (diff >= 2.5){ hg=2; ag=0; }
  else if (diff >= 1.5){ hg=2; ag=1; }
  else if (diff >= 0.5){ hg=1; ag=0; }
  else if (diff >= -0.5){ hg=1; ag=1; }
  else if (diff >= -1.5){ hg=0; ag=1; }
  else if (diff >= -2.5){ hg=1; ag=2; }
  else if (diff >= -4)  { hg=0; ag=2; }
  else                  { hg=0; ag=3; }
  // Add realistic variance
  const noise = Math.round(diff * 0.3);
  return { home: Math.max(0, hg + (diff > 0 ? 0 : 0)), away: Math.max(0, ag) };
}

function confidence(homeStr, awayStr, homeRank, awayRank) {
  const d = Math.abs((homeStr - awayStr) + (awayRank - homeRank) * 0.1);
  if (d >= 4) return 88;
  if (d >= 3) return 80;
  if (d >= 2) return 72;
  if (d >= 1) return 63;
  return 52;
}

/* ── Text generators ──────────────────────────────────────────────────────── */
const RESULT_WORDS = {
  homeWin:  ['edge out','overcome','defeat','see off','beat'],
  draw:     ['play out a tight draw with','share the spoils with','cancel each other out against','draw with'],
  awayWin:  ['upset','overcome','defeat','beat','edge past'],
};
function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

function headline(hTeam, aTeam, score) {
  const d = score.home - score.away;
  if (d > 1)  return `${hTeam.name} look set to ${pick(RESULT_WORDS.homeWin)} ${aTeam.name} in what could be a commanding display of ${hTeam.flag} quality`;
  if (d === 1) return `A narrow ${hTeam.flag} ${hTeam.name} victory predicted — ${aTeam.flag} ${aTeam.name} will fight but the gap in quality may prove decisive`;
  if (d === 0) return `An evenly matched contest expected — ${hTeam.flag} ${hTeam.name} vs ${aTeam.flag} ${aTeam.name} could go right down to the wire`;
  if (d === -1) return `${aTeam.flag} ${aTeam.name} slight favourites — ${hTeam.flag} ${hTeam.name} must produce their best to upset the prediction`;
  return `${aTeam.flag} ${aTeam.name} hold significant advantages — ${hTeam.flag} ${hTeam.name} face an uphill battle to compete`;
}

function keyBattle(hData, aData) {
  const hp = hData.keyPlayers[0];
  const ap = aData.keyPlayers[0];
  const battles = [
    `${hp.name} (${hp.pos}) vs ${ap.name} (${ap.pos}) is the defining duel — who controls the midfield battle will likely determine the result`,
    `Watch ${hp.name} trying to create space against ${ap.name}'s defensive responsibility — this individual contest could swing the entire game`,
    `The clash between ${hp.name} going forward and ${ap.name}'s role in disrupting play is the tactical matchup that coaches will be most focused on`,
  ];
  return pick(battles);
}

function insight(hTeam, aTeam, hData, aData, score) {
  const homeStr = hTeam.strength, awayStr = aTeam.strength;
  const diff = homeStr - awayStr;
  const styles = [
    `${hTeam.name}'s ${hData.style.toLowerCase()} approach should ${diff > 1 ? 'give them an edge against' : 'be neutralised by'} ${aTeam.name}'s ${aData.style.toLowerCase()} system. ${hData.strengths[0]} will be crucial, while ${aTeam.name} will look to exploit ${hData.weaknesses[0].toLowerCase()}.`,
    `Tactically, this is a fascinating clash of ${hData.style.toLowerCase()} vs ${aData.style.toLowerCase()}. ${aTeam.name}'s ${aData.strengths[0].toLowerCase()} will test ${hTeam.name}'s ${hData.weaknesses[0].toLowerCase()} — expect the first 20 minutes to set the tone for the entire match.`,
    `Both teams have clear game plans: ${hTeam.name} will rely on ${hData.strengths[1].toLowerCase()} while ${aTeam.name} counter with ${aData.strengths[1].toLowerCase()}. The team that imposes their style first will likely emerge victorious.`,
  ];
  return pick(styles);
}

function mustWatch(hData, aData, score) {
  const pool = [...hData.keyPlayers, ...aData.keyPlayers];
  const star = score.home > score.away ? hData.keyPlayers[0] : score.away > score.home ? aData.keyPlayers[0] : pool[0];
  const reasons = [
    `${star.name} (${star.pos}) — ${star.desc}`,
    `Keep your eyes on ${star.name}: ${star.desc.split('—')[0].trim()} — in a match of this magnitude, expect them to be central to every key moment`,
  ];
  return pick(reasons);
}

/* ── Main export ──────────────────────────────────────────────────────────── */
export function generateMatchAnalysis(homeId, awayId) {
  const hTeam = TEAMS[homeId];
  const aTeam = TEAMS[awayId];
  const hData = TEAM_ANALYSIS[homeId];
  const aData = TEAM_ANALYSIS[awayId];

  if (!hTeam || !aTeam || !hData || !aData) return null;

  const score = predictScore(hTeam.strength, aTeam.strength, hData.rank, aData.rank);
  const conf  = confidence(hTeam.strength, aTeam.strength, hData.rank, aData.rank);

  return {
    headline:        headline(hTeam, aTeam, score),
    homeStrengths:   hData.strengths,
    awayStrengths:   aData.strengths,
    homeWeaknesses:  hData.weaknesses,
    awayWeaknesses:  aData.weaknesses,
    homeKeyPlayers:  hData.keyPlayers,
    awayKeyPlayers:  aData.keyPlayers,
    homeFIFARank:    hData.rank,
    awayFIFARank:    aData.rank,
    homeForm:        hData.form,
    awayForm:        aData.form,
    homeWcHistory:   hData.wcHistory,
    awayWcHistory:   aData.wcHistory,
    keyBattle:       keyBattle(hData, aData),
    predictedScore:  score,
    confidence:      conf,
    insight:         insight(hTeam, aTeam, hData, aData, score),
    mustWatch:       mustWatch(hData, aData, score),
  };
}
