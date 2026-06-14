import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Wifi, WifiOff, Clock } from 'lucide-react';
import useStore from '../store/useStore.js';
import { MATCHES } from '../data/matches.js';
import { GROUP_NAMES } from '../data/teams.js';
import { useLiveScoresContext } from '../context/LiveScoresContext.jsx';
import MatchCard from '../components/scores/MatchCard.jsx';
import GroupStandings from '../components/scores/GroupStandings.jsx';

// Group matches by date string (e.g. "Jun 11")
const groupByDate = (matches) => {
  const map = {};
  matches.forEach(m => {
    if (!map[m.date]) map[m.date] = [];
    map[m.date].push(m);
  });
  return map;
};

// Parse "Jun 11" → Date for sorting
const parseMatchDate = (str) => {
  const [mon, day] = str.split(' ');
  const months = {Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
  return new Date(2026, months[mon], parseInt(day));
};

const todayStr = () => {
  const d = new Date();
  return d.toLocaleDateString('en-US',{month:'short',day:'numeric'});
};

export default function LiveScores() {
  const { predictions } = useStore();
  const { loading, error, lastFetch, refetch, resolveMatch } = useLiveScoresContext();
  const [tab,   setTab]   = useState('TODAY');
  const [group, setGroup] = useState('ALL');

  const allResolved = MATCHES.map(m => resolveMatch(m));
  const liveCount   = allResolved.filter(m => m.status === 'LIVE').length;
  const today       = todayStr(); // e.g. "Jun 12"

  const filtered = allResolved.filter(m => {
    const gOk = group === 'ALL' || m.group === group;
    if (!gOk) return false;
    if (tab === 'TODAY')    return m.date === today;
    if (tab === 'LIVE')     return m.status === 'LIVE';
    if (tab === 'RESULTS')  return m.status === 'FT';
    if (tab === 'UPCOMING') return m.status === 'UPCOMING';
    return true;
  });

  // For ALL tab, group by date sorted chronologically
  const byDate     = groupByDate(allResolved.filter(m => group === 'ALL' || m.group === group));
  const sortedDates = Object.keys(byDate).sort((a,b) => parseMatchDate(a) - parseMatchDate(b));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl text-white tracking-widest">LIVE SCORES</h1>
          <p className="text-white/40 text-sm">
            {liveCount > 0 ? `🔴 ${liveCount} match${liveCount>1?'es':''} live now` : `FIFA WC 2026 · ${today}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {loading ? <RefreshCw size={13} className="text-wc-blue animate-spin"/>
                   : error ? <WifiOff size={13} className="text-wc-red" title={error}/>
                   : <Wifi size={13} className="text-wc-live"/>}
          {lastFetch && (
            <span className="text-white/25 text-[10px] flex items-center gap-1">
              <Clock size={9}/>{lastFetch.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}
            </span>
          )}
          <button onClick={refetch} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors">
            <RefreshCw size={12}/>
          </button>
        </div>
      </div>

      {error && (
        <div className="glass-card p-3 border border-wc-red/30 text-wc-red text-xs">
          ⚠️ {error} — scores will retry automatically
        </div>
      )}

      {/* Date tabs */}
      <div className="flex gap-2 flex-wrap">
        {['TODAY','LIVE','RESULTS','UPCOMING','ALL'].map(t => (
          <button key={t} onClick={()=>setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${tab===t?'tab-active':'tab-inactive'}`}>
            {t==='LIVE' && liveCount>0 && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"/>}
            {t==='TODAY'?`Today · ${today}`:t}
          </button>
        ))}
      </div>

      {/* Group filter */}
      <div className="flex gap-1.5 flex-wrap">
        {['ALL',...GROUP_NAMES].map(g=>(
          <button key={g} onClick={()=>setGroup(g)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${group===g?'tab-active':'tab-inactive'}`}>
            {g==='ALL'?'All Groups':`Group ${g}`}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'ALL' ? (
        sortedDates.map(date => {
          const dayMatches = byDate[date];
          const isToday = date === today;
          return (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className={`font-display text-xl tracking-wider ${isToday?'text-wc-gold':'text-white/60'}`}>
                  {isToday ? `📅 Today — ${date}` : date}
                </h2>
                <div className="flex-1 h-px bg-white/5"/>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {dayMatches.map(m=>(
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
              <p className="text-3xl mb-2">{tab==='TODAY'?'📅':'🔍'}</p>
              <p>{tab==='TODAY'?'No matches scheduled for today':'No matches for this filter'}</p>
            </div>
          )}
          {group !== 'ALL' && <GroupStandings group={group}/>}
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map(m=>(
              <motion.div key={m.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                <MatchCard match={m} showPrediction={predictions[m.id]}/>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
