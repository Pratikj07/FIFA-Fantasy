import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { TEAMS, getTeamsByGroup } from '../../data/teams.js';
import { R32, BRACKET, SLOT_LABEL } from '../../data/bracket.js';
import useStore from '../../store/useStore.js';

/* ── Helpers ── */
function getThirdOptions(groups3rdStr, bracketPicks, thirdPicks, currentMatchId) {
  if (!groups3rdStr) return [];
  // Collect all teams already used in OTHER 3rd-place slots
  const usedElsewhere = Object.entries(thirdPicks)
    .filter(([id, t]) => id !== currentMatchId && t)
    .map(([, t]) => t);

  return groups3rdStr.split('/').flatMap(g => {
    const picks = bracketPicks.groups?.[g] ?? {};
    return getTeamsByGroup(g)
      .filter(t => t.id !== picks.first && t.id !== picks.second && !usedElsewhere.includes(t.id))
      .map(t => ({ ...t, fromGroup: g }));
  });
}

function winnerOf(prevId, bp) {
  if (!prevId) return null;
  if (prevId.startsWith('r32')) return bp.r32?.[prevId] ?? null;
  if (prevId.startsWith('r16')) return bp.r16?.[prevId] ?? null;
  if (prevId.startsWith('qf'))  return bp.qf?.[prevId]  ?? null;
  if (prevId.startsWith('sf'))  return bp.sf?.[prevId]  ?? null;
  return null;
}

function resolveR32Teams(match, bp, tp) {
  const res = slot => {
    if (!slot) return null;
    if (slot.type==='W')   return bp.groups?.[slot.group]?.first  ?? null;
    if (slot.type==='R')   return bp.groups?.[slot.group]?.second ?? null;
    if (slot.type==='3rd') return tp?.[match.id] ?? null;
    return null;
  };
  return { home: res(match.homeSlot), away: res(match.awaySlot) };
}

/* ── 3rd Place Picker ── */
function ThirdPlacePicker({ matchId, groups3rdStr, currentPick }) {
  const { bracketPicks, thirdPicks, setThirdPick } = useStore();
  const [open, setOpen] = useState(!currentPick);
  const options = getThirdOptions(groups3rdStr, bracketPicks, thirdPicks, matchId);
  const picked  = currentPick ? TEAMS[currentPick] : null;
  const noOpts  = options.length === 0;

  return (
    <div className="mb-3 rounded-xl overflow-hidden border border-dashed border-wc-blue/30 bg-wc-blue/5">
      <button onClick={()=>setOpen(v=>!v)}
        className="w-full flex items-center justify-between px-3 py-2 text-left">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-wc-blue text-[10px] font-bold uppercase tracking-widest shrink-0">Best 3rd Place</span>
          <span className="text-white/25 text-[10px] truncate">from Groups {groups3rdStr}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {picked && <span className="text-base leading-none">{picked.flag}</span>}
          <span className={`text-[10px] font-semibold ${picked?'text-wc-blue':'text-white/30'}`}>
            {picked ? picked.name : 'Pick team'}
          </span>
          {open ? <ChevronUp size={11} className="text-white/30"/> : <ChevronDown size={11} className="text-white/30"/>}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
            <div className="px-3 pb-3">
              {noOpts ? (
                <p className="text-white/25 text-[10px] text-center py-2">
                  Complete group picks for groups {groups3rdStr} first (or all eligible teams are taken)
                </p>
              ) : (
                <>
                  <p className="text-white/30 text-[10px] mb-2">Which team advances as best 3rd from these groups?</p>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
                    {options.map(t=>(
                      <button key={t.id}
                        onClick={()=>{ setThirdPick(matchId, t.id===currentPick?null:t.id); setOpen(false); }}
                        className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-all text-xs ${
                          currentPick===t.id
                            ?'bg-wc-blue/20 border border-wc-blue/40 text-white'
                            :'bg-white/5 hover:bg-white/10 border border-white/8 text-white/70'
                        }`}>
                        <span className="text-lg leading-none">{t.flag}</span>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{t.name}</p>
                          <p className="text-white/30 text-[9px]">3rd · Grp {t.fromGroup}</p>
                        </div>
                        {currentPick===t.id && <span className="ml-auto text-wc-blue text-[10px] shrink-0">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Team Slot ── */
function TeamSlot({ teamId, isPicked, onClick, placeholder, disabled }) {
  const team = teamId && teamId!=='3rd' ? TEAMS[teamId] : null;
  return (
    <button onClick={!disabled&&team?onClick:undefined} disabled={disabled||!team}
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl w-full text-left transition-all ${
        isPicked
          ?'bg-wc-gold/15 border border-wc-gold/40 shadow-[0_0_10px_rgba(245,197,24,0.1)]'
          :team
          ?'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-wc-gold/20 cursor-pointer'
          :'bg-white/3 border border-white/5 cursor-default opacity-50'
      }`}>
      {team ? (
        <>
          <span className="text-2xl leading-none">{team.flag}</span>
          <span className={`flex-1 font-semibold text-sm truncate ${isPicked?'text-wc-gold':'text-white/80'}`}>{team.name}</span>
          {isPicked && <span className="text-wc-gold text-xs shrink-0">✓</span>}
        </>
      ) : (
        <>
          <span className="text-lg opacity-20">❓</span>
          <span className="flex-1 text-white/20 text-xs truncate">{placeholder??'TBD'}</span>
        </>
      )}
    </button>
  );
}

/* ── R32 Match Card ── */
function R32MatchCard({ match, index }) {
  const { bracketPicks, thirdPicks, setBracketPick } = useStore();
  const has3rdHome = match.homeSlot?.type==='3rd';
  const has3rdAway = match.awaySlot?.type==='3rd';
  const has3rd     = has3rdHome||has3rdAway;
  const groups3rd  = (has3rdHome?match.homeSlot:match.awaySlot)?.groups3rd??'';
  const { home, away } = resolveR32Teams(match, bracketPicks, thirdPicks);
  const current    = bracketPicks.r32?.[match.id]??null;
  const thirdTeam  = thirdPicks?.[match.id]??null;
  const bothReady  = home&&away;
  const pick = t => { if (!bothReady||!t) return; setBracketPick('r32',match.id,t===current?null:t); };

  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:index*0.03}}
      className={`relative glass-card p-3 space-y-2 ${current?'border border-wc-gold/20':''}`}>
      {current&&<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-wc-gold to-transparent rounded-t-2xl"/>}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] bg-wc-gold/10 text-wc-gold border border-wc-gold/20 rounded px-1.5 py-0.5 font-semibold">R32</span>
        <span className="text-[10px] text-white/25 flex items-center gap-1"><Calendar size={8}/> {match.date} · {match.time}</span>
      </div>
      {has3rd && <ThirdPlacePicker matchId={match.id} groups3rdStr={groups3rd} currentPick={thirdTeam}/>}
      <TeamSlot teamId={home} isPicked={current===home} onClick={()=>pick(home)} placeholder={SLOT_LABEL(match.homeSlot)} disabled={!bothReady}/>
      <div className="text-center text-white/15 text-[10px] font-display tracking-widest">VS</div>
      <TeamSlot teamId={away} isPicked={current===away} onClick={()=>pick(away)} placeholder={SLOT_LABEL(match.awaySlot)} disabled={!bothReady}/>
      <div className="flex items-center gap-1 pt-0.5 text-white/20 text-[9px]"><MapPin size={8}/><span className="truncate">{match.venue.split(',')[0]}</span></div>
      {!bothReady&&(
        <p className="text-[10px] text-white/25 text-center">
          {has3rd&&!thirdTeam?'↑ Pick the Best 3rd Place team above first':'Complete group picks to unlock'}
        </p>
      )}
    </motion.div>
  );
}

/* ── Knockout Match Card ── */
function KnockoutMatchCard({ matchId, round, index }) {
  const { bracketPicks, setBracketPick } = useStore();
  const node = BRACKET[matchId]; if (!node) return null;
  const home    = winnerOf(node.prevHome, bracketPicks);
  const away    = winnerOf(node.prevAway, bracketPicks);
  const current = round==='final' ? bracketPicks.final : bracketPicks[round]?.[matchId]??null;
  const bothReady = home&&away;
  const roundShort = {r16:'R16',qf:'QF',sf:'SF',final:'FINAL'}[round]??round.toUpperCase();
  const pick = t => { if (!bothReady||!t) return; setBracketPick(round,matchId,t===current?null:t); };

  return (
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:index*0.04}}
      className={`relative glass-card p-3 space-y-2 ${current?'border border-wc-gold/20':''}`}>
      {current&&<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-wc-gold to-transparent rounded-t-2xl"/>}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] bg-wc-gold/10 text-wc-gold border border-wc-gold/20 rounded px-1.5 py-0.5 font-semibold">{roundShort}</span>
        {node.date&&<span className="text-[10px] text-white/25 flex items-center gap-1"><Calendar size={8}/>{node.date}</span>}
      </div>
      <TeamSlot teamId={home} isPicked={current===home} onClick={()=>pick(home)} placeholder="Winner from prev round" disabled={!bothReady}/>
      <div className="text-center text-white/15 text-[10px] font-display tracking-widest">VS</div>
      <TeamSlot teamId={away} isPicked={current===away} onClick={()=>pick(away)} placeholder="Winner from prev round" disabled={!bothReady}/>
      {node.venue&&<div className="flex items-center gap-1 pt-0.5 text-white/20 text-[9px]"><MapPin size={8}/><span className="truncate">{node.venue.split(',')[0]}</span></div>}
      {!bothReady&&<p className="text-[10px] text-white/25 text-center">Complete earlier rounds to unlock</p>}
    </motion.div>
  );
}

/* ── Export ── */
export default function RoundPicker({ round, roundLabel }) {
  if (round==='r32') return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white font-bold">{roundLabel}</h2>
        <p className="text-white/40 text-xs mt-0.5">16 matches · Matches with a 3rd-place slot show a team picker — each team can only be used once</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {R32.map((m,i)=><R32MatchCard key={m.id} match={m} index={i}/>)}
      </div>
    </div>
  );

  const matchIds = round==='final' ? ['final'] : Object.keys(BRACKET).filter(k=>k.startsWith(round));
  const labels = {r16:'Round of 16',qf:'Quarter-Finals',sf:'Semi-Finals',final:'🏆 The Final'};

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-white font-bold">{roundLabel??labels[round]}</h2>
        <p className="text-white/40 text-xs mt-0.5">
          {round==='final'?'1 match · Crown your champion':`${matchIds.length} matches · Click a team to advance them`}
        </p>
      </div>
      <div className={`grid gap-3 ${round==='final'?'max-w-sm mx-auto':'sm:grid-cols-2'}`}>
        {matchIds.map((id,i)=><KnockoutMatchCard key={id} matchId={id} round={round} index={i}/>)}
      </div>
    </div>
  );
}
