import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Lock, Sparkles, CheckCircle, Pencil } from 'lucide-react';
import { TEAMS } from '../../data/teams.js';
import { calcPoints } from '../../utils/scoring.js';
import { useLiveScoresContext } from '../../context/LiveScoresContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import useStore from '../../store/useStore.js';
import Flag from '../ui/Flag.jsx';
import AuthModal from '../auth/AuthModal.jsx';

const STAGE_LABEL = { R32:'Round of 32', R16:'Round of 16', QF:'Quarter-Final', SF:'Semi-Final', '3RD':'3rd Place Playoff', FINAL:'Final' };

const Spinner = ({ value, onPlus, onMinus, disabled }) => (
  <div className="flex flex-col items-center gap-1">
    <button onClick={onPlus} disabled={disabled}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${disabled?'opacity-20 cursor-not-allowed':'bg-white/8 hover:bg-wc-gold/20 hover:text-wc-gold active:scale-90'}`}>
      <Plus size={14}/>
    </button>
    <span className="score-font text-5xl text-white w-10 text-center leading-none">{value}</span>
    <button onClick={onMinus} disabled={disabled || value === 0}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${disabled||value===0?'opacity-20 cursor-not-allowed':'bg-white/8 hover:bg-red-500/20 hover:text-red-400 active:scale-90'}`}>
      <Minus size={14}/>
    </button>
  </div>
);

export default function PredictCard({ match, onAIClick }) {
  const { predictions, setPrediction } = useStore();
  const { resolveMatch } = useLiveScoresContext();
  const { user } = useAuth();
  const resolved = resolveMatch(match);
  const saved = predictions[match.id];
  const matchStarted = resolved.status === 'LIVE' || resolved.status === 'FT';

  const [ph, setPh] = useState(saved?.h ?? 1);
  const [pa, setPa] = useState(saved?.a ?? 1);
  const [flash, setFlash] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (saved && !matchStarted) { setPh(saved.h); setPa(saved.a); }
  }, [saved?.h, saved?.a]);

  const ht = TEAMS[match.home];
  const at = TEAMS[match.away];
  if (!ht || !at) return null;

  const isFT        = resolved.status === 'FT';
  const hasScore     = resolved.homeScore != null && resolved.awayScore != null;
  const scoreResult = isFT && hasScore && saved ? calcPoints(saved.h, saved.a, resolved.homeScore, resolved.awayScore) : null;
  const hasChanged  = saved && (ph !== saved.h || pa !== saved.a);
  const isUpdate    = !!saved && !matchStarted;

  const submit = () => {
    if (matchStarted) return;
    if (!user) { setShowAuth(true); return; }
    setPrediction(match.id, ph, pa);
    setFlash(true); setTimeout(() => setFlash(false), 800);
  };

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
      className={`relative glass-card p-4 overflow-hidden transition-all
        ${flash ? 'border border-wc-gold/50 shadow-[0_0_30px_rgba(245,197,24,0.2)]' : ''}
        ${matchStarted ? 'opacity-80' : ''}`}>
      {flash && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-wc-gold to-transparent"/>}

      <AnimatePresence>
        {scoreResult && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} className="absolute top-3 right-3">
            <span className="text-xs font-bold px-2 py-1 rounded-full border"
              style={{color:scoreResult.color,borderColor:scoreResult.color+'40',background:scoreResult.color+'15'}}>
              +{scoreResult.pts} pts
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status chips */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-[10px] bg-wc-gold/10 text-wc-gold border border-wc-gold/20 rounded px-1.5 py-0.5 font-semibold">
          {match.stage && match.stage !== 'GROUP' ? STAGE_LABEL[match.stage] || match.stage : `Group ${match.group} · MD${match.matchday}`}
        </span>
        {matchStarted && (
          <span className="flex items-center gap-1 text-[10px] text-white/30 bg-white/5 rounded px-1.5 py-0.5">
            <Lock size={9}/> {resolved.status === 'LIVE' ? 'In Progress' : 'Finished'}
          </span>
        )}
        {saved && !matchStarted && !hasChanged && (
          <span className="flex items-center gap-1 text-[10px] text-wc-live bg-wc-live/10 rounded px-1.5 py-0.5">
            <CheckCircle size={9}/> Saved
          </span>
        )}
        {hasChanged && (
          <span className="flex items-center gap-1 text-[10px] text-wc-gold bg-wc-gold/10 rounded px-1.5 py-0.5 animate-pulse">
            <Pencil size={9}/> Unsaved
          </span>
        )}
      </div>

      {/* Teams + spinners */}
      <div className="flex items-center justify-between gap-3 mt-2">
        {/* Home */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Flag iso2={ht.iso2} size="lg" className="rounded"/>
          <span className="text-white text-xs font-semibold text-center leading-tight">{ht.name}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Spinner value={ph}
            onPlus={()=>!matchStarted&&setPh(v=>Math.min(v+1,20))}
            onMinus={()=>!matchStarted&&setPh(v=>Math.max(v-1,0))}
            disabled={matchStarted}/>
          <span className="text-white/20 font-display text-2xl">–</span>
          <Spinner value={pa}
            onPlus={()=>!matchStarted&&setPa(v=>Math.min(v+1,20))}
            onMinus={()=>!matchStarted&&setPa(v=>Math.max(v-1,0))}
            disabled={matchStarted}/>
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <Flag iso2={at.iso2} size="lg" className="rounded"/>
          <span className="text-white text-xs font-semibold text-center leading-tight">{at.name}</span>
        </div>
      </div>

      <p className="text-center text-white/25 text-[10px] mt-3 mb-4">
        {match.date} · {match.time} ET · {match.venue.split(',')[0]}
      </p>

      {/* Final result */}
      {isFT && (
        <div className="mb-3 py-2 bg-white/4 rounded-xl text-center">
          {hasScore ? (
            <div className="flex items-center justify-center gap-2 text-sm">
              <Flag iso2={ht.iso2} size="sm"/>
              <span className="text-wc-live font-bold">{resolved.homeScore} – {resolved.awayScore}</span>
              <Flag iso2={at.iso2} size="sm"/>
            </div>
          ) : (
            <p className="text-white/30 text-xs">Match finished — final score syncing…</p>
          )}
          {scoreResult && <p className="text-[11px] mt-1" style={{color:scoreResult.color}}>{scoreResult.label}</p>}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {matchStarted ? (
          <div className="flex-1 flex items-center justify-center gap-1.5 text-white/30 text-sm py-2.5 bg-white/4 rounded-xl">
            <Lock size={13}/> {resolved.status==='LIVE' ? 'Match In Progress' : 'Match Finished'}
          </div>
        ) : (
          <button onClick={submit}
            className={`flex-1 text-sm py-2.5 font-semibold rounded-xl transition-all
              ${hasChanged||!saved ? 'btn-gold' : 'bg-white/6 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70'}`}>
            {!user ? '🔒 Sign In to Predict' : isUpdate ? (hasChanged ? '↺ Update Prediction' : '✓ Saved') : 'Lock In Prediction'}
          </button>
        )}
        <button onClick={() => onAIClick && onAIClick(match)}
          className="btn-ghost px-3 py-2.5 flex items-center gap-1.5 text-xs border border-wc-blue/20 text-wc-blue hover:bg-wc-blue/10">
          <Sparkles size={14}/> AI
        </button>
      </div>
      {saved && !matchStarted && !hasChanged && (
        <p className="text-center text-white/20 text-[10px] mt-2">✏️ Adjust above to update before kickoff</p>
      )}

      <AuthModal open={showAuth} onClose={()=>setShowAuth(false)}
        message="Sign in to save your prediction — it's free and takes seconds"
        onAuthenticated={() => setPrediction(match.id, ph, pa)}/>
    </motion.div>
  );
}
