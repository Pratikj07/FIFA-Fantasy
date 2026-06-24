import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, RotateCcw, ChevronRight, Lock, Save, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore.js';
import { GROUP_NAMES } from '../data/teams.js';
import { ROUND_LABELS } from '../data/bracket.js';
import GroupPicks from '../components/bracket/GroupPicks.jsx';
import RoundPicker from '../components/bracket/RoundPicker.jsx';
import BracketVisual from '../components/bracket/BracketVisual.jsx';

export const BRACKET_DEADLINE = new Date('2026-06-17T23:59:59-04:00');
export const bracketLocked = () => new Date() > BRACKET_DEADLINE;

const ROUNDS = [
  {id:'groups',label:'Group Picks'},
  {id:'r32',   label:'Round of 32'},
  {id:'r16',   label:'Round of 16'},
  {id:'qf',    label:'Quarter-Finals'},
  {id:'sf',    label:'Semi-Finals'},
  {id:'final', label:'🏆 Final'},
];

function Progress({ bracketPicks }) {
  const gd  = GROUP_NAMES.filter(g=>bracketPicks.groups[g].first&&bracketPicks.groups[g].second).length;
  const r32 = Object.values(bracketPicks.r32||{}).filter(Boolean).length;
  const r16 = Object.values(bracketPicks.r16||{}).filter(Boolean).length;
  const qf  = Object.values(bracketPicks.qf||{}).filter(Boolean).length;
  const sf  = Object.values(bracketPicks.sf||{}).filter(Boolean).length;
  const fin = bracketPicks.final ? 1 : 0;
  const total = 12+16+8+4+2+1; const done = gd+r32+r16+qf+sf+fin;
  const pct = Math.round((done/total)*100);
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">Bracket Progress</span>
        <span className="font-display text-2xl text-wc-gold">{pct}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-wc-gold to-yellow-300"
          initial={{width:0}} animate={{width:`${pct}%`}} transition={{duration:0.6}}/>
      </div>
      <div className="grid grid-cols-6 gap-1 mt-3 text-center">
        {[['Groups',gd,12],['R32',r32,16],['R16',r16,8],['QF',qf,4],['SF',sf,2],['Final',fin,1]].map(([l,d,t])=>(
          <div key={l}><p className={`text-[10px] font-bold ${d===t?'text-wc-gold':'text-white/30'}`}>{d}/{t}</p><p className="text-[9px] text-white/20">{l}</p></div>
        ))}
      </div>
    </div>
  );
}

export default function Bracket() {
  const { bracketPicks, thirdPicks, clearBracket, saveBracket } = useStore();
  const [tab,     setTab]     = useState('groups');
  const [visual,  setVisual]  = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saving,  setSaving]  = useState(false);
  // saved stays true until user makes changes after saving
  const [saved,   setSaved]   = useState(false);
  const savedSnapshotRef = useRef(null);
  const locked     = bracketLocked();
  const groupsDone = GROUP_NAMES.filter(g=>bracketPicks.groups[g].first&&bracketPicks.groups[g].second).length===12;

  // Watch for changes after a save — if bracket changes, show "Save Bracket" again
  useEffect(() => {
    if (!saved || savedSnapshotRef.current === null) return;
    const current = JSON.stringify({ bracketPicks, thirdPicks });
    if (current !== savedSnapshotRef.current) {
      setSaved(false);
    }
  }, [bracketPicks, thirdPicks]);

  const handleSave = async () => {
    setSaving(true);
    await saveBracket();
    setSaving(false);
    setSaved(true);
    // Snapshot what was just saved — future changes will revert button
    savedSnapshotRef.current = JSON.stringify({ bracketPicks, thirdPicks });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-4xl text-white tracking-widest">BRACKET</h1>
          <p className="text-white/40 text-sm">Full tournament prediction · Groups to the Final</p>
        </div>
        <div className="flex items-center gap-2">
          {!locked && (
            <button onClick={handleSave} disabled={saving}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${
                saved
                  ? 'bg-wc-live/10 text-wc-live border-wc-live/30'
                  : 'bg-wc-gold/10 text-wc-gold border-wc-gold/25 hover:bg-wc-gold/20'
              }`}>
              {saving ? <><Save size={12} className="animate-pulse"/> Saving…</>
               : saved ? <><CheckCircle size={12}/> Saved</>
               : <><Save size={12}/> Save Bracket</>}
            </button>
          )}
          {!locked && (
            <button onClick={()=>setConfirm(v=>!v)}
              className="flex items-center gap-1.5 text-white/30 hover:text-wc-red text-xs transition-colors">
              <RotateCcw size={12}/>Reset
            </button>
          )}
        </div>
      </div>

      {locked ? (
        <div className="glass-card p-4 border border-wc-gold/30 flex items-center gap-3">
          <Lock size={16} className="text-wc-gold shrink-0"/>
          <div>
            <p className="text-white font-semibold text-sm">Bracket Locked</p>
            <p className="text-white/40 text-xs">Predictions locked June 17 before Matchday 2 began</p>
          </div>
        </div>
      ) : (
        <div className="glass-card p-3 border border-wc-blue/20 bg-wc-blue/5">
          <p className="text-wc-blue text-xs font-semibold flex items-center gap-2">
            <Lock size={11}/> Bracket locks June 17 midnight ET — save before then!
          </p>
          <p className="text-white/30 text-[10px] mt-0.5">
            You can save multiple times. Button shows ✓ Saved until you make new changes.
          </p>
        </div>
      )}

      {confirm && !locked && (
        <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} className="glass-card p-4 border border-wc-red/30">
          <p className="text-white text-sm font-semibold mb-3">Reset all bracket picks?</p>
          <div className="flex gap-2">
            <button onClick={()=>{clearBracket();setConfirm(false);setSaved(false);savedSnapshotRef.current=null;}}
              className="text-xs py-2 px-4 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">Yes, reset</button>
            <button onClick={()=>setConfirm(false)} className="btn-ghost text-xs py-2 px-4">Cancel</button>
          </div>
        </motion.div>
      )}

      <Progress bracketPicks={bracketPicks}/>

      <button onClick={()=>setVisual(v=>!v)}
        className="w-full flex items-center justify-between px-4 py-3 glass-card border border-wc-blue/20 text-wc-blue hover:bg-wc-blue/5 transition-all text-sm font-semibold">
        <span className="flex items-center gap-2"><GitBranch size={15}/> Full Bracket Visual</span>
        <ChevronRight size={14} className={`transition-transform ${visual?'rotate-90':''}`}/>
      </button>
      {visual && (
        <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}}>
          <div className="glass-card p-3">
            <p className="text-white/25 text-[10px] mb-2 uppercase tracking-widest">Scroll horizontally to see full bracket</p>
            <BracketVisual/>
          </div>
        </motion.div>
      )}

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {ROUNDS.map(r => {
          const needsGroups = r.id !== 'groups' && !groupsDone;
          return (
            <button key={r.id} onClick={()=>!needsGroups&&setTab(r.id)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab===r.id?'tab-active':needsGroups?'opacity-30 cursor-not-allowed tab-inactive':'tab-inactive'
              }`}>
              {r.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.2}}>
          {tab==='groups' && <GroupPicks locked={locked}/>}
          {tab==='r32'    && <RoundPicker round="r32" roundLabel={ROUND_LABELS?.r32||'Round of 32'} locked={locked}/>}
          {tab==='r16'    && <RoundPicker round="r16" roundLabel={ROUND_LABELS?.r16||'Round of 16'} locked={locked}/>}
          {tab==='qf'     && <RoundPicker round="qf"  roundLabel={ROUND_LABELS?.qf||'Quarter-Finals'} locked={locked}/>}
          {tab==='sf'     && <RoundPicker round="sf"  roundLabel={ROUND_LABELS?.sf||'Semi-Finals'} locked={locked}/>}
          {tab==='final'  && <RoundPicker round="final" roundLabel="🏆 The Final" locked={locked}/>}
        </motion.div>
      </AnimatePresence>

      <div className="glass-card p-4">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Bracket Points</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {[['Group Advance','2'],['R32 Correct','3'],['R16 Correct','5'],['QF Correct','8'],['SF Correct','12'],['Champion','20']].map(([l,p])=>(
            <div key={l} className="bg-white/3 rounded-lg p-2 text-center">
              <p className="text-wc-gold font-bold">{p} pts</p><p className="text-white/40 text-[10px] mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
