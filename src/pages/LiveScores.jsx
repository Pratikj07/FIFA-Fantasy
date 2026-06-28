import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';
import useStore from '../store/useStore.js';
import { ALL_MATCHES } from '../data/matches.js';
import { GROUP_NAMES } from '../data/teams.js';
import { useLiveScoresContext } from '../context/LiveScoresContext.jsx';
import { isMatchLocalToday, matchSortKey } from '../utils/matchTime.js';
import MatchCard from '../components/scores/MatchCard.jsx';
import GroupStandings from '../components/scores/GroupStandings.jsx';

// Sort all matches chronologically once
const SORTED = [...ALL_MATCHES].sort((a, b) => matchSortKey(a.date, a.time) - matchSortKey(b.date, b.time));

// Group sorted matches by date string for the ALL tab
const groupByDate = (matches) => {
  const map = {};
  matches.forEach(m => { (map[m.date] ??= []).push(m); });
  return map;
};

export default function LiveScores() {
  const { predictions } = useStore();
  const { loading, error, lastFetch, refetch, resolveMatch } = useLiveScoresContext();
  const [tab,   setTab]   = useState('TODAY');
  const [group, setGroup] = useState('ALL');
  const [stage, setStage] = useState('ALL');

  const allResolved = SORTED.map(m => resolveMatch(m));
  const liveCount   = allResolved.filter(m => m.status === 'LIVE').length;

  const sFilter = (m) => stage === 'ALL' || (m.stage ?? 'GROUP') === stage;
  const gFilter = (m) => sFilter(m) && (group === 'ALL' || m.group === group);

  // TODAY: matches whose ET kickoff lands on today in the USER's local timezone
  // Always include LIVE matches regardless of date (so Indian users never miss a live game)
  const todayMatches = allResolved.filter(m =>
    gFilter(m) && (m.status === 'LIVE' || isMatchLocalToday(m.date, m.time))
  );

  const filtered = allResolved.filter(m => {
    if (!gFilter(m)) return false;
    if (tab === 'TODAY')    return m.status === 'LIVE' || isMatchLocalToday(m.date, m.time);
    if (tab === 'LIVE')     return m.status === 'LIVE';
    if (tab === 'RESULTS')  return m.status === 'FT';
    if (tab === 'UPCOMING') return m.status === 'UPCOMING';
    return true; // ALL
  });

  // For ALL tab: group by date string (already sorted chronologically)
  const byDate      = groupByDate(allResolved.filter(gFilter));
  const sortedDates = Object.keys(byDate); // already in order since allResolved is sorted

  // Local "today" label for display
  const todayLabel = new Date().toLocaleDateString('en-US', { month:'short', day:'numeric' });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl text-white tracking-widest">LIVE SCORES</h1>
          <p className="text-white/40 text-sm">
            {liveCount > 0
              ? `🔴 ${liveCount} match${liveCount > 1 ? 'es' : ''} live now`
              : `FIFA WC 2026 · ${todayLabel}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {loading
            ? <RefreshCw size={13} className="text-wc-blue animate-spin"/>
            : error
            ? <WifiOff size={13} className="text-wc-red" title={error}/>
            : <Wifi size={13} className="text-wc-live"/>}
          {lastFetch && (
            <span className="text-white/25 text-[10px] flex items-center gap-1">
              <Clock size={9}/>{lastFetch.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
            </span>
          )}
          <button onClick={refetch}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
            <RefreshCw size={12}/>
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card p-3 border border-wc-red/30 text-wc-red text-xs">
          ⚠️ {error} — scores will retry automatically
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['TODAY','LIVE','RESULTS','UPCOMING','ALL'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5
              ${tab === t ? 'tab-active' : 'tab-inactive'}`}>
            {t === 'LIVE' && liveCount > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>
            )}
            {t === 'TODAY' ? `Today · ${todayLabel}` : t}
          </button>
        ))}
      </div>

      {/* Stage filter */}
      <div className="flex gap-1.5 flex-wrap">
        {[
          ['ALL','All Stages'],['GROUP','Group Stage'],['R32','Round of 32'],
          ['R16','Round of 16'],['QF','Quarter-Finals'],['SF','Semi-Finals'],
          ['3RD','3rd Place'],['FINAL','Final'],
        ].map(([s, label]) => (
          <button key={s} onClick={() => { setStage(s); if (s !== 'GROUP' && s !== 'ALL') setGroup('ALL'); }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${stage===s?'tab-active':'tab-inactive'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Group filter — only relevant for group stage */}
      {(stage === 'ALL' || stage === 'GROUP') && (
        <div className="flex gap-1.5 flex-wrap">
          {['ALL', ...GROUP_NAMES].map(g => (
            <button key={g} onClick={() => setGroup(g)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${group===g?'tab-active':'tab-inactive'}`}>
              {g === 'ALL' ? 'All Groups' : `Group ${g}`}
            </button>
          ))}
        </div>
      )}

      {/* ALL tab — grouped by date, chronological */}
      {tab === 'ALL' ? (
        sortedDates.map(date => {
          const dayMatches = byDate[date];
          if (!dayMatches?.length) return null;
          const isToday = isMatchLocalToday(date, dayMatches[0].time) || dayMatches.some(m => m.status === 'LIVE');
          return (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className={`font-display text-xl tracking-wider ${isToday ? 'text-wc-gold' : 'text-white/60'}`}>
                  {isToday ? `📅 Today — ${date}` : date}
                </h2>
                <div className="flex-1 h-px bg-white/5"/>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {dayMatches.map(m => (
                  <motion.div key={m.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                    <MatchCard match={m} showPrediction={predictions[m.id]}/>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-white/30">
              <p className="text-3xl mb-2">{tab === 'TODAY' ? '📅' : '🔍'}</p>
              <p>{tab === 'TODAY' ? 'No matches scheduled in your local timezone today' : 'No matches for this filter'}</p>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map(m => (
              <motion.div key={m.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                <MatchCard match={m} showPrediction={predictions[m.id]}/>
              </motion.div>
            ))}
          </div>
          {group !== 'ALL' && (stage === 'ALL' || stage === 'GROUP') && <GroupStandings group={group}/>}
        </>
      )}
    </div>
  );
}
