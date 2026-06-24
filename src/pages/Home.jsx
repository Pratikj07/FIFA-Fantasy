import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Trophy, ArrowRight } from 'lucide-react';
import useStore from '../store/useStore.js';
import { useAuth } from '../context/AuthContext.jsx';
import { supabase } from '../lib/supabase.js';
import { MATCHES } from '../data/matches.js';
import { useLiveScoresContext } from '../context/LiveScoresContext.jsx';
import { totalPoints, predictionCount, accuracy } from '../utils/scoring.js';
import { matchSortKey } from '../utils/matchTime.js';
import MatchCard from '../components/scores/MatchCard.jsx';

const StatBox = ({ icon: Icon, label, value, sub, color = 'text-wc-gold', delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className="glass-card p-4 flex flex-col gap-1">
    <div className="flex items-center gap-2 text-white/40 text-xs mb-1"><Icon size={12}/>{label}</div>
    <span className={`font-display text-4xl ${color}`}>{value}</span>
    {sub && <span className="text-white/30 text-[10px]">{sub}</span>}
  </motion.div>
);

export default function Home() {
  const { user } = useAuth();
  const { predictions, completedResults } = useStore();
  const { resolveMatch } = useLiveScoresContext();

  const allResolved    = MATCHES.map(m => resolveMatch(m));
  const sortedResolved = [...allResolved].sort(
    (a, b) => matchSortKey(a.date, a.time) - matchSortKey(b.date, b.time)
  );

  const liveMatches = sortedResolved.filter(m => m.status === 'LIVE');
  const ftMatches   = sortedResolved.filter(m => m.status === 'FT').slice(-3);
  const nextMatch   = sortedResolved.find(m => m.status === 'UPCOMING' && !predictions[m.id]);

  const myPts     = totalPoints(predictions, completedResults);
  const predCount = predictionCount(predictions);
  const acc       = accuracy(predictions, completedResults);

  const [rankData, setRankData] = useState({ rank: '—', total: '—', loaded: false });

  useEffect(() => {
    if (!user) return;
    const fetchRank = async () => {
      if (!supabase) { setRankData({ rank: 1, total: 1, loaded: true }); return; }
      try {
        const [{ data: allPreds }, { count: totalUsers }] = await Promise.all([
          supabase.from('predictions').select('user_id, match_id, home_score, away_score'),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
        ]);
        if (!allPreds || totalUsers == null) { setRankData({ rank: 1, total: 1, loaded: true }); return; }
        const byUser = {};
        allPreds.forEach(p => {
          if (!byUser[p.user_id]) byUser[p.user_id] = {};
          byUser[p.user_id][p.match_id] = { h: p.home_score, a: p.away_score };
        });
        const usersAhead = Object.entries(byUser)
          .filter(([uid]) => uid !== user.id)
          .filter(([, preds]) => totalPoints(preds, completedResults) > myPts)
          .length;
        setRankData({ rank: usersAhead + 1, total: totalUsers, loaded: true });
      } catch { setRankData({ rank: 1, total: 1, loaded: true }); }
    };
    fetchRank();
  }, [user?.id, myPts]);

  const rankDisplay = rankData.loaded ? `#${rankData.rank}` : '…';
  const rankSub     = rankData.loaded ? `of ${rankData.total} players` : 'loading…';

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl overflow-hidden p-8"
        style={{ background:'linear-gradient(135deg,#0A1628,#071020,#0A1628)', border:'1px solid rgba(245,197,24,0.2)', boxShadow:'0 0 60px rgba(245,197,24,0.08)' }}>
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(245,197,24,0.08),transparent 70%)' }}/>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🏆</span>
            <div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase">FIFA World Cup</p>
              <h1 className="font-display text-5xl text-wc-gold tracking-widest leading-none">2026</h1>
            </div>
          </div>
          <p className="text-white/50 text-sm mt-1">Mexico · Canada · United States</p>
          <p className="text-white/30 text-xs mt-0.5">June 11 – July 19, 2026 · 48 Teams · 104 Matches</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {liveMatches.length > 0 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center gap-1.5">
                <span className="live-dot"/> {liveMatches.length} match{liveMatches.length > 1 ? 'es' : ''} live now
              </span>
            )}
            {predCount > 0 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-wc-gold/10 border border-wc-gold/25 text-wc-gold">
                {predCount} predictions locked in
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <div>
        <h2 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Your Performance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox icon={Trophy}   label="Total Points" value={myPts}       color="text-wc-gold"  delay={0.00}/>
          <StatBox icon={Activity} label="Global Rank"  value={rankDisplay} color="text-wc-blue"  delay={0.05} sub={rankSub}/>
          <StatBox icon={Target}   label="Predictions"  value={predCount}   color="text-white"    delay={0.10}/>
          <StatBox icon={Activity} label="Accuracy"     value={`${acc}%`}   color="text-wc-live"  delay={0.15}/>
        </div>
      </div>

      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3 flex items-center gap-2">
            <span className="live-dot"/> Live Right Now
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {liveMatches.map(m => (
              <Link key={m.id} to="/scores"><MatchCard match={m} showPrediction={predictions[m.id]}/></Link>
            ))}
          </div>
        </div>
      )}

      {nextMatch && (
        <div>
          <h2 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Next to Predict</h2>
          <Link to="/predictions"><MatchCard match={nextMatch} compact/></Link>
          <Link to="/predictions"
            className="mt-2 flex items-center justify-center gap-2 text-wc-gold text-sm font-medium py-3 rounded-xl border border-wc-gold/20 bg-wc-gold/5 hover:bg-wc-gold/10 transition-colors">
            See all predictions <ArrowRight size={14}/>
          </Link>
        </div>
      )}

      {ftMatches.length > 0 && (
        <div>
          <h2 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Recent Results</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {ftMatches.map(m => <MatchCard key={m.id} match={m} compact showPrediction={predictions[m.id]}/>)}
          </div>
          <Link to="/scores"
            className="mt-3 flex items-center justify-center gap-2 text-white/40 text-xs py-2 hover:text-white/70 transition-colors">
            View all results <ArrowRight size={12}/>
          </Link>
        </div>
      )}

      <div className="glass-card p-5">
        <h2 className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">How Points Work</h2>
        <div className="grid grid-cols-2 gap-2">
          {[
            {pts:5,label:'🎯 Exact Score',   sub:'Both goals exactly right'},
            {pts:3,label:'✅ Correct Diff',  sub:'Same margin, right result'},
            {pts:2,label:'✓ Correct Result', sub:'Win / Draw / Loss correct'},
            {pts:0,label:'❌ Wrong Result',  sub:'Better luck next match'},
          ].map(({pts,label,sub}) => (
            <div key={pts} className="bg-white/3 rounded-xl p-3">
              <span className="font-display text-2xl text-wc-gold">{pts}</span>
              <span className="text-white/30 text-[10px] ml-1">pts</span>
              <p className="text-white text-xs font-medium mt-0.5">{label}</p>
              <p className="text-white/30 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
