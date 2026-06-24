import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';

const RANK_COLORS = {
  1: { bg: 'bg-yellow-400/10', border: 'border-yellow-400/40', text: 'text-yellow-400',  emoji: '🥇' },
  2: { bg: 'bg-slate-300/8',   border: 'border-slate-300/30',  text: 'text-slate-300',   emoji: '🥈' },
  3: { bg: 'bg-amber-600/10',  border: 'border-amber-600/30',  text: 'text-amber-600',   emoji: '🥉' },
};

const PodiumCard = ({ player }) => {
  const c = RANK_COLORS[player.rank] ?? {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: player.rank * 0.08 }}
      className={`flex-1 rounded-2xl border p-4 text-center ${c.bg} ${c.border}`}
    >
      <div className="text-3xl mb-2">{player.avatar}</div>
      <div className="text-xl mb-0.5">{c.emoji}</div>
      <p className={`font-bold text-sm truncate ${c.text}`}>{player.username}</p>
      <p className="text-white/30 text-[10px]">{player.country}</p>
      <p className={`font-display text-3xl mt-2 ${c.text}`}>{player.pts}</p>
      <p className="text-white/40 text-[10px]">pts</p>
      {player.isMe && (
        <span className="inline-block mt-1 text-[9px] bg-wc-gold/20 text-wc-gold px-1.5 py-0.5 rounded-full border border-wc-gold/30">
          YOU
        </span>
      )}
    </motion.div>
  );
};

export default function LeaderboardTable({ rows }) {
  const top3 = rows.slice(0, 3);
  const rest  = rows.slice(3);

  return (
    <div className="space-y-4">
      {/* Podium */}
      <div className="flex gap-3">
        {top3.map(p => <PodiumCard key={p.id} player={p} />)}
      </div>

      {/* Rest of table */}
      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-white/30 text-xs">
              <th className="text-left p-3 pl-4 font-medium">#</th>
              <th className="text-left p-3 font-medium">Player</th>
              <th className="text-center p-3 font-medium">Preds</th>
              <th className="text-center p-3 font-medium">Acc%</th>
              <th className="text-center p-3 pr-4 font-medium text-wc-gold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((player, i) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`border-t border-white/4 transition-colors
                  ${player.isMe
                    ? 'bg-wc-gold/8 border-wc-gold/20'
                    : 'hover:bg-white/3'
                  }`}
              >
                <td className="p-3 pl-4 text-white/40 font-mono text-xs">{player.rank}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{player.avatar}</span>
                    <div>
                      <p className={`font-semibold text-sm ${player.isMe ? 'text-wc-gold' : 'text-white'}`}>
                        {player.username}
                        {player.isMe && <span className="ml-2 text-[10px] bg-wc-gold/20 text-wc-gold px-1.5 py-0.5 rounded-full">YOU</span>}
                      </p>
                      <p className="text-white/30 text-[10px]">{player.country}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-center text-white/50 text-xs">{player.predCount}</td>
                <td className="p-3 text-center text-xs">
                  <span className={`font-medium ${
                    player.acc >= 70 ? 'text-wc-live' :
                    player.acc >= 50 ? 'text-wc-gold' : 'text-white/40'
                  }`}>
                    {player.acc}%
                  </span>
                </td>
                <td className="p-3 pr-4 text-center">
                  <span className={`font-bold font-display text-xl ${player.isMe ? 'text-wc-gold' : 'text-white'}`}>
                    {player.pts}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
