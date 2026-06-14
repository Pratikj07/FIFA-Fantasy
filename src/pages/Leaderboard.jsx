import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Users } from 'lucide-react';
import useStore from '../store/useStore.js';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabase.js';
import { calcPoints, pointsBreakdown } from '../utils/scoring.js';
import { MATCHES } from '../data/matches.js';
import { TEAMS } from '../data/teams.js';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable.jsx';

function computePoints(preds, completedResults) {
  let pts = 0;
  MATCHES.forEach(m => {
    const res = completedResults[m.id];
    if (!res || res.status !== 'FT') return;
    const p = preds[m.id];
    if (!p) return;
    pts += calcPoints(p.h, p.a, res.homeScore, res.awayScore).pts;
  });
  return pts;
}

export default function Leaderboard() {
  const { user } = useAuth();
  const { predictions, completedResults } = useStore();
  const [board,     setBoard]     = useState([]);
  const [fetching,  setFetching]  = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  const breakdown = useMemo(() => pointsBreakdown(predictions, completedResults), [predictions, completedResults]);

  useEffect(() => {
    buildBoard();
  }, [completedResults]);

  const buildBoard = async () => {
    setFetching(true);
    try {
      if (supabase) {
        // Fetch all profiles + all predictions from Supabase
        const [{ data: profiles }, { data: preds }] = await Promise.all([
          supabase.from('profiles').select('id, username, avatar'),
          supabase.from('predictions').select('user_id, match_id, home_score, away_score'),
        ]);

        if (profiles && preds) {
          // Group predictions by user
          const byUser = {};
          preds.forEach(p => {
            if (!byUser[p.user_id]) byUser[p.user_id] = {};
            byUser[p.user_id][p.match_id] = { h: p.home_score, a: p.away_score };
          });

          const rows = profiles.map(p => ({
            id: p.id,
            username: p.username,
            avatar: p.avatar,
            country: '🌍',
            pts: computePoints(byUser[p.id] || {}, completedResults),
            predCount: Object.keys(byUser[p.id] || {}).length,
            acc: (() => {
              const up = byUser[p.id] || {};
              const done = MATCHES.filter(m => completedResults[m.id]?.status === 'FT' && up[m.id]);
              if (!done.length) return 0;
              const correct = done.filter(m => calcPoints(up[m.id].h, up[m.id].a, completedResults[m.id].homeScore, completedResults[m.id].awayScore).type !== 'wrong').length;
              return Math.round((correct / done.length) * 100);
            })(),
            isMe: p.id === user?.id,
            isBot: false,
          }));

          rows.sort((a,b) => b.pts - a.pts || b.acc - a.acc || b.predCount - a.predCount);
          setBoard(rows.map((r,i) => ({ ...r, rank: i+1 })));
          setFetching(false);
          return;
        }
      }
    } catch {}
    // Offline fallback — just show current user
    const myPts = computePoints(predictions, completedResults);
    setBoard([{ id: user?.id, username: user?.username || 'You', avatar: user?.avatar || '⚽', country:'🌍', pts: myPts, predCount: Object.keys(predictions).length, acc: 0, isMe: true, isBot: false, rank: 1 }]);
    setFetching(false);
  };

  const myEntry = board.find(r => r.isMe);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl text-white tracking-widest">LEADERBOARD</h1>
          <p className="text-white/40 text-sm flex items-center gap-1.5">
            <Users size={12}/>{board.length} players competing
          </p>
        </div>
        <button onClick={buildBoard} className="text-white/30 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
          {fetching ? '…' : '↺ Refresh'}
        </button>
      </div>

      {myEntry && (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="glass-card-gold p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="text-5xl">{myEntry.avatar}</span>
                <span className="absolute -bottom-1 -right-1 font-display text-xs bg-wc-gold text-wc-bg rounded-full w-5 h-5 flex items-center justify-center font-bold">{myEntry.rank}</span>
              </div>
              <div><p className="text-white font-bold text-lg">{myEntry.username}</p><p className="text-white/40 text-xs">Rank #{myEntry.rank} of {board.length}</p></div>
            </div>
            <div className="text-right"><p className="font-display text-5xl text-wc-gold">{myEntry.pts}</p><p className="text-white/30 text-xs">total points</p></div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/8">
            <div className="text-center"><p className="font-display text-2xl text-wc-blue">{myEntry.predCount}</p><p className="text-white/30 text-[10px]">Predictions</p></div>
            <div className="text-center"><p className="font-display text-2xl text-wc-live">{myEntry.acc}%</p><p className="text-white/30 text-[10px]">Accuracy</p></div>
            <div className="text-center"><p className="font-display text-2xl text-white">{Math.max(0, board.length - myEntry.rank)}</p><p className="text-white/30 text-[10px]">Ahead of</p></div>
          </div>
        </motion.div>
      )}

      {breakdown.length > 0 && (
        <div>
          <button onClick={()=>setShowBreak(v=>!v)} className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors mb-3">
            <BarChart2 size={12}/>{showBreak?'Hide':'Show'} My Score Breakdown
          </button>
          {showBreak && (
            <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} className="glass-card overflow-hidden mb-4 p-4">
              {breakdown.map(({match,prediction,pts,type})=>{
                const ht=TEAMS[match.home],at=TEAMS[match.away];
                const c={exact:'#F5C518',diff:'#38BDF8',result:'#00FF88',wrong:'#FF4565'}[type];
                return (
                  <div key={match.id} className="flex items-center justify-between py-2 border-b border-white/4 last:border-0">
                    <div className="flex items-center gap-2 text-sm"><span>{ht?.flag} {ht?.name}</span><span className="text-white/20 text-xs">vs</span><span>{at?.flag} {at?.name}</span></div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-white/30">{prediction.h}–{prediction.a} / {match.homeScore}–{match.awayScore}</span>
                      <span className="font-bold text-[10px] px-2 py-0.5 rounded-full" style={{color:c,background:c+'15',border:`1px solid ${c}40`}}>+{pts}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>
      )}

      <LeaderboardTable rows={board}/>
    </div>
  );
}
