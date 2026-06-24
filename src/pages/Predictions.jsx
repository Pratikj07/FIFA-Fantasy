import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lock, Filter, ChevronDown, Calendar } from 'lucide-react';
import useStore from '../store/useStore.js';
import { MATCHES } from '../data/matches.js';
import { GROUP_NAMES } from '../data/teams.js';
import { predictionCount } from '../utils/scoring.js';
import { useLiveScoresContext } from '../context/LiveScoresContext.jsx';
import { isMatchLocalToday, matchSortKey } from '../utils/matchTime.js';
import PredictCard from '../components/predictions/PredictCard.jsx';
import AIAnalysis from '../components/predictions/AIAnalysis.jsx';

// All matches sorted chronologically (ET → UTC, timezone-correct)
const SORTED = [...MATCHES].sort((a, b) => matchSortKey(a.date, a.time) - matchSortKey(b.date, b.time));

// Group by matchday
const BY_MD = SORTED.reduce((acc, m) => { (acc[m.matchday] ??= []).push(m); return acc; }, {});
const MD_DATES = { 1:'Jun 11 – Jun 17', 2:'Jun 18 – Jun 22', 3:'Jun 24 – Jun 27' };

export default function Predictions() {
  const { predictions } = useStore();
  const { resolveMatch } = useLiveScoresContext();
  const [tab,      setTab]      = useState('TODAY');
  const [group,    setGroup]    = useState('ALL');
  const [showGrps, setShowGrps] = useState(false);
  const [aiMatch,  setAiMatch]  = useState(null);
  const predCount = predictionCount(predictions);

  const todayLabel = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric' });

  const gOk = (m) => group === 'ALL' || m.group === group;

  const filterMatch = (m) => {
    const resolved = resolveMatch(m);
    if (!gOk(m)) return false;
    // TODAY: match kickoff lands on user's local today — always include LIVE matches
    if (tab === 'TODAY')          return resolved.status === 'LIVE' || isMatchLocalToday(m.date, m.time);
    if (tab === 'UPCOMING')       return resolved.status === 'UPCOMING';
    if (tab === 'MY PREDICTIONS') return !!predictions[m.id];
    return true;
  };

  const todayCount   = SORTED.filter(m => gOk(m) && (resolveMatch(m).status === 'LIVE' || isMatchLocalToday(m.date, m.time))).length;
  const visibleTotal = SORTED.filter(filterMatch).length;

  return (
    <>
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-4xl text-white tracking-widest">PREDICTIONS</h1>
          <p className="text-white/40 text-sm">{predCount} locked in · up to 5 pts per match · editable until kickoff</p>
        </div>

        {/* Points legend */}
        <div className="flex gap-2 flex-wrap">
          {[{pts:5,l:'Exact Score'},{pts:3,l:'Correct Diff'},{pts:2,l:'Correct Result'},{pts:0,l:'Wrong'}].map(({pts,l})=>(
            <div key={pts} className="flex items-center gap-1.5 bg-white/4 rounded-lg px-2.5 py-1.5 text-xs">
              <span className="text-wc-gold font-bold">{pts}pts</span>
              <span className="text-white/40">{l}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {[
            { val:'TODAY',          label:`📅 Today · ${todayLabel}`, badge: todayCount || null },
            { val:'UPCOMING',       label:'Upcoming' },
            { val:'ALL',            label:'All Matches' },
            { val:'MY PREDICTIONS', label:`My Picks (${predCount})`, lock: true },
          ].map(({ val, label, badge, lock }) => (
            <button key={val} onClick={() => setTab(val)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5
                ${tab === val ? 'tab-active' : 'tab-inactive'}`}>
              {lock && <Lock size={10}/>}
              {label}
              {badge && (
                <span className="bg-wc-gold text-wc-bg rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Group filter */}
        <div className="glass-card overflow-hidden">
          <button onClick={() => setShowGrps(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-left">
            <div className="flex items-center gap-2">
              <Filter size={12} className="text-white/40"/>
              <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">Filter by Group</span>
              {group !== 'ALL' && (
                <span className="text-xs bg-wc-gold/15 text-wc-gold border border-wc-gold/30 rounded px-1.5 py-0.5 font-semibold">
                  Group {group}
                </span>
              )}
            </div>
            <ChevronDown size={14} className={`text-white/30 transition-transform ${showGrps ? 'rotate-180' : ''}`}/>
          </button>
          {showGrps && (
            <div className="px-4 pb-4 flex gap-1.5 flex-wrap border-t border-white/5 pt-3">
              <button onClick={() => setGroup('ALL')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${group==='ALL'?'tab-active':'tab-inactive'}`}>
                All Groups
              </button>
              {GROUP_NAMES.map(g => (
                <button key={g} onClick={() => setGroup(g)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${group===g?'tab-active':'tab-inactive'}`}>
                  Group {g}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TODAY tab */}
        {tab === 'TODAY' && (
          visibleTotal === 0 ? (
            <div className="text-center py-16 text-white/30 space-y-3">
              <Calendar size={40} className="mx-auto opacity-20"/>
              <p className="font-semibold text-white/40">No matches in your timezone today</p>
              <p className="text-sm">Matches show based on your local time. Switch to Upcoming to see all.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-xl text-wc-gold tracking-wider">Today · {todayLabel}</span>
                <div className="flex-1 h-px bg-white/5"/>
                <span className="text-white/30 text-[10px]">{visibleTotal} matches</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {SORTED.filter(filterMatch).map((m, i) => (
                    <motion.div key={m.id} layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}>
                      <PredictCard match={m} onAIClick={setAiMatch}/>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )
        )}

        {/* Other tabs — Matchday sections */}
        {tab !== 'TODAY' && (
          visibleTotal === 0 ? (
            <div className="text-center py-16 text-white/30">
              <Target size={36} className="mx-auto mb-3 opacity-30"/>
              <p className="font-semibold">No matches here</p>
              <p className="text-sm mt-1">
                {tab === 'MY PREDICTIONS' ? 'No predictions yet — switch to Upcoming to start' : 'Try a different filter'}
              </p>
            </div>
          ) : (
            [1, 2, 3].map(md => {
              const mdMatches = (BY_MD[md] || []).filter(filterMatch);
              if (!mdMatches.length) return null;
              return (
                <div key={md} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-wc-gold tracking-wider">Matchday {md}</span>
                    <span className="text-white/25 text-[10px]">{MD_DATES[md]}</span>
                    <div className="flex-1 h-px bg-white/5"/>
                    <span className="text-white/20 text-[10px]">{mdMatches.length} matches</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                      {mdMatches.map((m, i) => (
                        <motion.div key={m.id} layout initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:i*0.02}}>
                          <PredictCard match={m} onAIClick={setAiMatch}/>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })
          )
        )}

        <div className="glass-card p-4 text-center">
          <p className="text-white/30 text-xs">
            💡 Today shows matches by your local time — works for India, USA, Europe and all timezones.
            Live matches always appear in Today regardless of timezone.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {aiMatch && <AIAnalysis match={aiMatch} onClose={() => setAiMatch(null)}/>}
      </AnimatePresence>
    </>
  );
}
