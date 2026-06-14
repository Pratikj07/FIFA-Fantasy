import { TEAMS } from '../../data/teams.js';
import { buildStandings } from '../../utils/scoring.js';
import useStore from '../../store/useStore.js';
import Flag from '../ui/Flag.jsx';

export default function GroupStandings({ group }) {
  const { completedResults } = useStore();
  const rows = buildStandings(group, completedResults);
  if (!rows.some(r => r.mp > 0)) return null;
  return (
    <div className="glass-card p-4 mt-3">
      <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-3">Group {group} Standings</p>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-white/30 text-[10px]">
            {['#','Team','MP','W','D','L','GD','PTS'].map(h=>(
              <th key={h} className={`pb-2 font-medium ${h==='Team'?'text-left':'text-center'} ${h==='PTS'?'text-wc-gold':''}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const team = TEAMS[row.id]; if (!team) return null;
            return (
              <tr key={row.id} className={`border-t border-white/5 ${i < 2 ? 'text-white' : 'text-white/50'}`}>
                <td className="py-2 pr-2 text-center">
                  {i < 2
                    ? <span className="w-4 h-4 rounded-full bg-wc-gold/20 text-wc-gold inline-flex items-center justify-center font-bold text-[10px]">{i+1}</span>
                    : <span className="text-white/30">{i+1}</span>}
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <Flag iso2={team.iso2} size="sm"/>
                    <span className="truncate">{team.name}</span>
                  </div>
                </td>
                <td className="text-center py-2">{row.mp}</td>
                <td className="text-center py-2">{row.w}</td>
                <td className="text-center py-2">{row.d}</td>
                <td className="text-center py-2">{row.l}</td>
                <td className="text-center py-2">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                <td className="text-center py-2 font-bold text-wc-gold">{row.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-[9px] text-white/20 mt-2">🟡 Top 2 qualify to Round of 32</p>
    </div>
  );
}
