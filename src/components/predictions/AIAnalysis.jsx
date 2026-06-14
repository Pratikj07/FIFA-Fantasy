import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, TrendingUp, Shield, Star, Activity } from 'lucide-react';
import { TEAMS } from '../../data/teams.js';
import { generateMatchAnalysis } from '../../utils/analysisEngine.js';

const Backdrop = ({ children, onClose }) => (
  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
    onClick={onClose}
    className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
    <motion.div initial={{opacity:0,y:60}} animate={{opacity:1,y:0}} exit={{opacity:0,y:60}}
      transition={{type:'spring',damping:28}} onClick={e=>e.stopPropagation()}
      className="w-full max-w-lg glass-card-gold max-h-[90vh] overflow-y-auto">
      {children}
    </motion.div>
  </motion.div>
);

const FormDot = ({r}) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold ${
    r==='W'?'bg-wc-live/20 text-wc-live':r==='D'?'bg-wc-gold/20 text-wc-gold':'bg-wc-red/20 text-wc-red'
  }`}>{r}</span>
);

export default function AIAnalysis({ match, onClose }) {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (!match) return;
    // Small delay for UX polish
    const t = setTimeout(() => setAnalysis(generateMatchAnalysis(match.home, match.away)), 400);
    return () => clearTimeout(t);
  }, [match?.id]);

  if (!match) return null;
  const ht = TEAMS[match.home];
  const at = TEAMS[match.away];
  if (!ht || !at) return null;

  return (
    <AnimatePresence>
      <Backdrop onClose={onClose}>
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-wc-gold" />
              <span className="text-[10px] font-bold text-wc-gold uppercase tracking-widest">Match Analysis</span>
              <span className="text-[9px] bg-wc-gold/10 text-wc-gold border border-wc-gold/20 rounded px-1.5 py-0.5">AI Engine</span>
            </div>
            <h2 className="font-display text-2xl text-white">
              {ht.flag} {ht.short} <span className="text-white/30">vs</span> {at.flag} {at.short}
            </h2>
            <p className="text-white/40 text-xs mt-0.5">Group {match.group} · {match.date} · {match.time} ET</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white p-1 transition-colors">
            <X size={18}/>
          </button>
        </div>

        {!analysis ? (
          <div className="py-12 flex flex-col items-center gap-3 text-white/40">
            <div className="w-8 h-8 border-2 border-wc-gold/40 border-t-wc-gold rounded-full animate-spin"/>
            <p className="text-sm">Analysing match data…</p>
          </div>
        ) : (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-5 space-y-5">

            {/* Headline */}
            <p className="text-white/70 text-sm leading-relaxed italic border-l-2 border-wc-gold pl-3">
              "{analysis.headline}"
            </p>

            {/* Prediction */}
            <div className="flex items-center justify-between gap-4 py-4 bg-white/3 rounded-2xl px-4">
              <div className="text-center flex-1">
                <div className="text-4xl mb-1">{ht.flag}</div>
                <p className="text-wc-gold font-display text-5xl">{analysis.predictedScore.home}</p>
                <div className="flex justify-center gap-0.5 mt-2">
                  {analysis.homeForm?.map((r,i)=><FormDot key={i} r={r}/>)}
                </div>
                <p className="text-white/25 text-[9px] mt-1">FIFA #{analysis.homeFIFARank}</p>
              </div>
              <div className="text-center">
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-1">Prediction</p>
                <p className="text-white/20 font-display text-xl">–</p>
                <div className="mt-2">
                  <div className="text-wc-blue text-xs font-bold">{analysis.confidence}%</div>
                  <div className="text-white/25 text-[9px]">confidence</div>
                </div>
              </div>
              <div className="text-center flex-1">
                <div className="text-4xl mb-1">{at.flag}</div>
                <p className="text-wc-gold font-display text-5xl">{analysis.predictedScore.away}</p>
                <div className="flex justify-center gap-0.5 mt-2">
                  {analysis.awayForm?.map((r,i)=><FormDot key={i} r={r}/>)}
                </div>
                <p className="text-white/25 text-[9px] mt-1">FIFA #{analysis.awayFIFARank}</p>
              </div>
            </div>

            {/* Team strengths */}
            <div className="grid grid-cols-2 gap-3">
              {[{team:ht,strengths:analysis.homeStrengths,weaknesses:analysis.homeWeaknesses,players:analysis.homeKeyPlayers},
                {team:at,strengths:analysis.awayStrengths,weaknesses:analysis.awayWeaknesses,players:analysis.awayKeyPlayers}]
                .map(({team,strengths,weaknesses,players})=>(
                  <div key={team.short} className="bg-white/3 rounded-xl p-3 space-y-2">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1">
                      <span>{team.flag}</span> {team.name}
                    </p>
                    <div>
                      <p className="text-[9px] text-wc-live font-semibold mb-1 uppercase tracking-wider">Strengths</p>
                      {strengths?.map((s,i)=>(
                        <p key={i} className="text-white/60 text-[10px] flex items-start gap-1 mb-0.5">
                          <span className="text-wc-live mt-0.5 shrink-0">+</span>{s}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[9px] text-wc-red font-semibold mb-1 uppercase tracking-wider">Weaknesses</p>
                      {weaknesses?.map((w,i)=>(
                        <p key={i} className="text-white/50 text-[10px] flex items-start gap-1 mb-0.5">
                          <span className="text-wc-red mt-0.5 shrink-0">–</span>{w}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Key Players */}
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-2 flex items-center gap-1.5">
                <Star size={10} className="text-wc-gold"/> Key Players
              </p>
              <div className="space-y-2">
                {[...(analysis.homeKeyPlayers||[]).map(p=>({...p,team:ht})),
                  ...(analysis.awayKeyPlayers||[]).map(p=>({...p,team:at}))].map((p,i)=>(
                  <div key={i} className="flex items-start gap-3 bg-white/3 rounded-xl p-2.5">
                    <span className="text-xl shrink-0">{p.team.flag}</span>
                    <div>
                      <p className="text-white font-semibold text-xs">{p.name}
                        <span className="ml-2 text-[9px] bg-wc-gold/15 text-wc-gold rounded px-1 py-0.5">{p.pos}</span>
                        <span className="ml-1 text-[9px] text-white/30">★ {p.rtg}</span>
                      </p>
                      <p className="text-white/50 text-[10px] leading-relaxed mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Battle */}
            <div className="bg-wc-blue/8 border border-wc-blue/20 rounded-xl p-3">
              <p className="text-[10px] text-wc-blue uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Activity size={10}/> Key Battle
              </p>
              <p className="text-white/70 text-xs leading-relaxed">{analysis.keyBattle}</p>
            </div>

            {/* Tactical Insight */}
            <div className="bg-white/3 rounded-xl p-3">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <TrendingUp size={10}/> Tactical Insight
              </p>
              <p className="text-white/65 text-xs leading-relaxed">{analysis.insight}</p>
            </div>

            {/* Must Watch */}
            <div className="bg-wc-gold/8 border border-wc-gold/20 rounded-xl p-3">
              <p className="text-[10px] text-wc-gold uppercase tracking-widest font-semibold mb-1 flex items-center gap-1.5">
                <Star size={10}/> Player to Watch
              </p>
              <p className="text-white/70 text-xs leading-relaxed">{analysis.mustWatch}</p>
            </div>

            {/* WC History */}
            <div className="grid grid-cols-2 gap-2">
              {[{team:ht,history:analysis.homeWcHistory},{team:at,history:analysis.awayWcHistory}].map(({team,history})=>(
                <div key={team.short} className="bg-white/3 rounded-xl p-2.5">
                  <p className="text-[9px] text-white/30 uppercase tracking-wider mb-1">{team.flag} WC History</p>
                  <p className="text-white/60 text-[10px] leading-relaxed">{history}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-white/20 text-[9px]">
              Analysis powered by WC26 AI Engine · Based on FIFA rankings, team data & historical performance
            </p>
          </motion.div>
        )}
      </Backdrop>
    </AnimatePresence>
  );
}
