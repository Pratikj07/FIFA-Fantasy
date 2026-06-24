import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { TEAMS } from '../../data/teams.js';
import Flag from '../ui/Flag.jsx';

const StatusBadge = ({ status, minute }) => {
  if (status === 'LIVE') return (
    <span className="flex items-center gap-1.5 bg-red-500/15 text-red-400 border border-red-500/30 rounded-full px-2.5 py-0.5 text-xs font-bold">
      <span className="live-dot"/> LIVE {minute ? `${minute}'` : ''}
    </span>
  );
  if (status === 'FT') return (
    <span className="bg-wc-live/10 text-wc-live border border-wc-live/30 rounded-full px-2.5 py-0.5 text-xs font-semibold">FT</span>
  );
  return <span className="bg-white/5 text-white/40 border border-white/8 rounded-full px-2.5 py-0.5 text-xs">UPCOMING</span>;
};

function TeamDisplay({ team, compact }) {
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <Flag iso2={team.iso2} size={compact ? 'sm' : 'md'} className="rounded"/>
      <div className="flex items-center gap-1 justify-center">
        <span className="text-white font-semibold text-xs text-center leading-tight">{team.name}</span>
      </div>
    </div>
  );
}

export default function MatchCard({ match, compact = false, onClick, showPrediction }) {
  const ht = TEAMS[match.home];
  const at = TEAMS[match.away];
  if (!ht || !at) return null;
  const status = match.status ?? 'UPCOMING';
  const isLive = status === 'LIVE';
  const hasSc  = status === 'FT' || isLive;

  return (
    <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} onClick={onClick}
      className={`relative glass-card cursor-pointer overflow-hidden transition-all duration-300 group
        ${isLive ? 'border border-red-500/25 shadow-[0_0_25px_rgba(255,70,101,0.08)]' : ''}
        ${compact ? 'p-3' : 'p-4'}`}>
      {isLive && <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"/>}

      {/* Match meta */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-wc-gold/10 text-wc-gold border border-wc-gold/20 rounded px-1.5 py-0.5 font-semibold">
            MD{match.matchday} · Grp {match.group}
          </span>
        </div>
        <StatusBadge status={status} minute={match.minute}/>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center justify-between gap-2">
        <TeamDisplay team={ht} compact={compact}/>

        <div className="flex items-center gap-2 px-1 shrink-0">
          {hasSc ? (
            <div className="flex items-center gap-2">
              <span className={`score-font text-white ${compact ? 'text-3xl' : 'text-5xl'}`}>{match.homeScore}</span>
              <span className="text-white/20 font-display text-xl">–</span>
              <span className={`score-font text-white ${compact ? 'text-3xl' : 'text-5xl'}`}>{match.awayScore}</span>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-display text-white/20 text-2xl">VS</p>
              <p className="text-[10px] text-white/30">{match.time}</p>
            </div>
          )}
        </div>

        <TeamDisplay team={at} compact={compact}/>
      </div>

      {/* User prediction */}
      {showPrediction && (
        <div className="mt-3 bg-wc-gold/8 border border-wc-gold/20 rounded-lg px-3 py-1.5 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-wc-gold">
            <Flag iso2={ht.iso2} size="sm"/>{showPrediction.h} – {showPrediction.a}<Flag iso2={at.iso2} size="sm"/>
          </div>
        </div>
      )}

      {/* Venue */}
      {!compact && (
        <div className="mt-3 flex items-center justify-center gap-1 text-white/25 text-[10px]">
          <MapPin size={9}/><span className="truncate">{match.venue}</span>
        </div>
      )}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-wc-gold/0 group-hover:ring-wc-gold/20 transition-all duration-300 pointer-events-none"/>
    </motion.div>
  );
}
