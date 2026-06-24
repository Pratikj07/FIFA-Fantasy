import { motion } from 'framer-motion';
import { CheckCircle, Lock } from 'lucide-react';
import { getTeamsByGroup, GROUP_NAMES } from '../../data/teams.js';
import useStore from '../../store/useStore.js';

function GroupCard({ group, locked }) {
  const { bracketPicks, setGroupPick } = useStore();
  const picks = bracketPicks.groups[group];
  const teams = getTeamsByGroup(group);

  const handleClick = (teamId) => {
    if (locked) return;
    if (picks.first===teamId)       { setGroupPick(group,'first',null); return; }
    if (picks.second===teamId)      { setGroupPick(group,'second',null); return; }
    if (!picks.first)               { setGroupPick(group,'first',teamId); return; }
    if (!picks.second)              { setGroupPick(group,'second',teamId); return; }
    setGroupPick(group,'second',teamId);
  };

  const badge = (id) => {
    if (picks.first===id)  return {label:'1st',cls:'bg-wc-gold text-wc-bg'};
    if (picks.second===id) return {label:'2nd',cls:'bg-wc-blue/90 text-wc-bg'};
    return null;
  };
  const done = picks.first && picks.second;

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className={`glass-card p-3 ${done?'border border-wc-gold/25':''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-lg text-wc-gold tracking-wider">Group {group}</span>
        <div className="flex items-center gap-1">
          {locked && <Lock size={11} className="text-white/30"/>}
          {done && !locked && <CheckCircle size={13} className="text-wc-live"/>}
        </div>
      </div>
      <div className="space-y-1.5">
        {teams.map(t => {
          const b = badge(t.id);
          return (
            <button key={t.id} onClick={()=>handleClick(t.id)}
              disabled={locked}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-xl text-left transition-all ${
                b ? 'bg-wc-gold/10 border border-wc-gold/30'
                  : done ? 'opacity-25 bg-white/3 cursor-default'
                  : locked ? 'bg-white/3 cursor-not-allowed opacity-50'
                  : 'bg-white/4 hover:bg-white/8 border border-transparent'
              }`}>
              <span className="text-xl leading-none">{t.flag}</span>
              <span className="flex-1 text-xs font-medium text-white/80 truncate">{t.name}</span>
              {b && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${b.cls}`}>{b.label}</span>}
            </button>
          );
        })}
      </div>
      {!locked && !picks.first && <p className="text-[10px] text-white/25 mt-2 text-center">Tap a team for 1st place</p>}
      {!locked && picks.first && !picks.second && <p className="text-[10px] text-white/30 mt-2 text-center">Now pick 2nd place</p>}
    </motion.div>
  );
}

export default function GroupPicks({ locked }) {
  const { bracketPicks } = useStore();
  const done = GROUP_NAMES.filter(g => bracketPicks.groups[g].first && bracketPicks.groups[g].second).length;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold">Group Stage Picks</h2>
          <p className="text-white/40 text-xs mt-0.5">{locked?'Bracket is locked':'Pick 1st and 2nd from each group'}</p>
        </div>
        <div className="text-right"><span className="font-display text-3xl text-wc-gold">{done}</span><span className="text-white/30 text-xs">/{GROUP_NAMES.length}</span></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GROUP_NAMES.map(g => <GroupCard key={g} group={g} locked={locked}/>)}
      </div>
    </div>
  );
}
