import { MATCHES, ALL_MATCHES } from '../data/matches.js';
import { TEAMS } from '../data/teams.js';

export function calcPoints(ph, pa, ah, aa) {
  if (ph===ah && pa===aa) return { pts:5, label:'🎯 Exact Score!',         color:'#F5C518', type:'exact'  };
  const pr = Math.sign(ph-pa), ar = Math.sign(ah-aa);
  if (pr !== ar)               return { pts:0, label:'❌ Wrong Result',      color:'#FF4565', type:'wrong'  };
  if ((ph-pa)===(ah-aa))       return { pts:3, label:'✅ Correct Difference',color:'#38BDF8', type:'diff'   };
  return                              { pts:2, label:'✓ Correct Result',    color:'#00FF88', type:'result' };
}

export function totalPoints(predictions, completedResults = {}) {
  let pts = 0;
  ALL_MATCHES.forEach(m => {
    const res = completedResults[m.id];
    if (!res || res.status !== 'FT') return;
    const p = predictions[m.id];
    if (!p) return;
    pts += calcPoints(p.h, p.a, res.homeScore, res.awayScore).pts;
  });
  return pts;
}

export function pointsBreakdown(predictions, completedResults = {}) {
  return ALL_MATCHES
    .filter(m => completedResults[m.id]?.status === 'FT' && predictions[m.id])
    .map(m => {
      const p   = predictions[m.id];
      const res = completedResults[m.id];
      const { pts, label, type } = calcPoints(p.h, p.a, res.homeScore, res.awayScore);
      return { match: { ...m, ...res }, prediction: p, pts, label, type };
    });
}

export function predictionCount(predictions) {
  return Object.keys(predictions).length;
}

export function accuracy(predictions, completedResults = {}) {
  const done = ALL_MATCHES.filter(m => completedResults[m.id]?.status === 'FT' && predictions[m.id]);
  if (!done.length) return 0;
  const correct = done.filter(m => {
    const p = predictions[m.id];
    const r = completedResults[m.id];
    return calcPoints(p.h, p.a, r.homeScore, r.awayScore).type !== 'wrong';
  }).length;
  return Math.round((correct / done.length) * 100);
}

export function buildStandings(group, completedResults = {}) {
  const done    = MATCHES.filter(m => m.group === group && completedResults[m.id]?.status === 'FT');
  const teamIds = Object.entries(TEAMS).filter(([, t]) => t.group === group).map(([id]) => id);
  const table   = {};
  teamIds.forEach(id => { table[id] = { id, mp:0, w:0, d:0, l:0, gf:0, ga:0, gd:0, pts:0 }; });
  done.forEach(m => {
    const res = completedResults[m.id];
    const h = table[m.home], a = table[m.away];
    if (!h || !a) return;
    h.mp++; a.mp++;
    h.gf += res.homeScore; h.ga += res.awayScore;
    a.gf += res.awayScore; a.ga += res.homeScore;
    h.gd = h.gf - h.ga;   a.gd = a.gf - a.ga;
    if      (res.homeScore > res.awayScore) { h.w++; h.pts += 3; a.l++;          }
    else if (res.homeScore === res.awayScore){ h.d++; h.pts++;    a.d++; a.pts++; }
    else                                     { a.w++; a.pts += 3; h.l++;          }
  });
  return Object.values(table).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
}
