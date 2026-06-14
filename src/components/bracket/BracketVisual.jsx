import { TEAMS } from '../../data/teams.js';
import { R32, BRACKET, LEFT_R32, RIGHT_R32, LEFT_R16, RIGHT_R16, LEFT_QF, RIGHT_QF } from '../../data/bracket.js';
import useStore from '../../store/useStore.js';

const ITEM_H=56, COL_W=130;

function r32TeamOf(matchId, side, bp, tp) {
  const m = R32.find(x=>x.id===matchId); if(!m) return null;
  const slot = side==='home'?m.homeSlot:m.awaySlot;
  if(slot.type==='W')   return bp.groups?.[slot.group]?.first  ?? null;
  if(slot.type==='R')   return bp.groups?.[slot.group]?.second ?? null;
  if(slot.type==='3rd') return tp?.[matchId] ?? null;
  return null;
}
function wOf(prevId,bp){
  if(!prevId) return null;
  if(prevId.startsWith('r32')) return bp.r32?.[prevId]??null;
  if(prevId.startsWith('r16')) return bp.r16?.[prevId]??null;
  if(prevId.startsWith('qf'))  return bp.qf?.[prevId] ??null;
  if(prevId.startsWith('sf'))  return bp.sf?.[prevId] ??null;
  return null;
}

function Slot({ teamId, isPicked, isRight }) {
  const team = teamId ? TEAMS[teamId] : null;
  const bg   = isPicked&&team ? 'rgba(245,197,24,0.18)' : team ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)';
  const bd   = isPicked&&team ? 'rgba(245,197,24,0.4)'  : 'rgba(255,255,255,0.08)';
  return (
    <div style={{background:bg,border:`1px solid ${bd}`,height:'100%',
      display:'flex',alignItems:'center',gap:5,padding:'0 7px',overflow:'hidden'}}>
      {team
        ? <>
            <span style={{fontSize:16,lineHeight:1}}>{team.flag}</span>
            <span style={{color:isPicked?'#F5C518':'rgba(255,255,255,0.8)',fontSize:9,fontWeight:600,
              whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:62}}>
              {team.name}
            </span>
          </>
        : <span style={{color:'rgba(255,255,255,0.15)',fontSize:9}}>TBD</span>
      }
    </div>
  );
}

function MatchItem({ matchId, round, topId, botId, pickedId, x, y, isRight }) {
  const half = ITEM_H/2 - 1;
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={0} y={0} width={COL_W-6} height={half}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{height:'100%',borderRadius:'6px 6px 0 0',overflow:'hidden'}}>
          <Slot teamId={topId} isPicked={pickedId===topId&&!!topId} isRight={isRight}/>
        </div>
      </foreignObject>
      <line x1={0} y1={half} x2={COL_W-6} y2={half} stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>
      <foreignObject x={0} y={half} width={COL_W-6} height={half}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{height:'100%',borderRadius:'0 0 6px 6px',overflow:'hidden'}}>
          <Slot teamId={botId} isPicked={pickedId===botId&&!!botId} isRight={isRight}/>
        </div>
      </foreignObject>
      {isRight
        ? <line x1={0} y1={ITEM_H/2} x2={-8} y2={ITEM_H/2} stroke="rgba(255,255,255,0.12)" strokeWidth={1}/>
        : <line x1={COL_W-6} y1={ITEM_H/2} x2={COL_W+2} y2={ITEM_H/2} stroke="rgba(255,255,255,0.12)" strokeWidth={1}/>
      }
    </g>
  );
}

function buildCol(ids, round, totalH, bp, tp, colX, isRight) {
  const n=ids.length; const slotH=totalH/n;
  return ids.map((id,i)=>{
    const cy=i*slotH+slotH/2; const y=cy-ITEM_H/2;
    let top,bot,picked;
    if(round==='r32'){
      top=r32TeamOf(id,'home',bp,tp); bot=r32TeamOf(id,'away',bp,tp); picked=bp.r32?.[id]??null;
    } else {
      const node=BRACKET[id]; if(!node) return null;
      top=wOf(node.prevHome,bp); bot=wOf(node.prevAway,bp);
      if(round==='r16') picked=bp.r16?.[id]??null;
      if(round==='qf')  picked=bp.qf?.[id] ??null;
      if(round==='sf')  picked=bp.sf?.[id] ??null;
    }
    const isEven=i%2===0;
    const pairY=isEven?cy:cy-slotH;
    const lx=isRight?colX-10:colX+COL_W-4;
    return (
      <g key={id}>
        {isEven&&(
          <line x1={lx} y1={pairY+slotH/2} x2={lx} y2={pairY+slotH+slotH/2}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1}/>
        )}
        <MatchItem matchId={id} round={round} topId={top} botId={bot} pickedId={picked} x={colX} y={y} isRight={isRight}/>
      </g>
    );
  });
}

export default function BracketVisual() {
  const { bracketPicks, thirdPicks } = useStore();
  const bp=bracketPicks, tp=thirdPicks;

  const TOTAL_H=640, PAD=16, CENTRE_W=150, HALF_COLS=4;
  const HALF_W=HALF_COLS*COL_W;
  const SVG_W=HALF_W*2+CENTRE_W+PAD*2;

  const Lr32X=PAD, Lr16X=Lr32X+COL_W, LqfX=Lr16X+COL_W, LsfX=LqfX+COL_W;
  const RsfX=LsfX+COL_W+CENTRE_W, RqfX=RsfX+COL_W, Rr16X=RqfX+COL_W, Rr32X=Rr16X+COL_W;
  const finalX=LsfX+COL_W+(CENTRE_W-COL_W+6)/2, finalY=TOTAL_H/2-ITEM_H/2;

  const finalHome=bp.sf?.['sf-1']??null, finalAway=bp.sf?.['sf-2']??null;
  const champion=bp.final, champTeam=champion?TEAMS[champion]:null;

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div style={{minWidth:SVG_W}}>
        <svg width={SVG_W} height={TOTAL_H+40} className="block">
          {buildCol(LEFT_R32, 'r32',TOTAL_H,bp,tp,Lr32X,false)}
          {buildCol(LEFT_R16, 'r16',TOTAL_H,bp,tp,Lr16X,false)}
          {buildCol(LEFT_QF,  'qf', TOTAL_H,bp,tp,LqfX, false)}
          {buildCol(['sf-1'], 'sf', TOTAL_H,bp,tp,LsfX, false)}
          {buildCol(['sf-2'], 'sf', TOTAL_H,bp,tp,RsfX, true)}
          {buildCol(RIGHT_QF,  'qf', TOTAL_H,bp,tp,RqfX, true)}
          {buildCol(RIGHT_R16, 'r16',TOTAL_H,bp,tp,Rr16X,true)}
          {buildCol(RIGHT_R32, 'r32',TOTAL_H,bp,tp,Rr32X,true)}

          {/* Final */}
          <g transform={`translate(${finalX},${finalY})`}>
            <rect x={-4} y={-4} width={COL_W+2} height={ITEM_H+8} rx={10}
              fill="rgba(245,197,24,0.05)" stroke="rgba(245,197,24,0.25)" strokeWidth={1}/>
            <foreignObject x={0} y={0} width={COL_W-6} height={ITEM_H/2-1}>
              <div xmlns="http://www.w3.org/1999/xhtml"
                style={{height:'100%',borderRadius:'6px 6px 0 0',overflow:'hidden',
                  background:champion===finalHome&&finalHome?'rgba(245,197,24,0.2)':'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(245,197,24,0.2)',display:'flex',alignItems:'center',gap:5,padding:'0 8px'}}>
                {finalHome&&TEAMS[finalHome]
                  ?<><span style={{fontSize:16}}>{TEAMS[finalHome].flag}</span>
                    <span style={{color:'#fff',fontSize:9,fontWeight:700}}>{TEAMS[finalHome].name}</span></>
                  :<span style={{color:'rgba(255,255,255,0.2)',fontSize:9}}>TBD</span>}
              </div>
            </foreignObject>
            <line x1={0} y1={ITEM_H/2} x2={COL_W-6} y2={ITEM_H/2} stroke="rgba(245,197,24,0.2)" strokeWidth={1}/>
            <foreignObject x={0} y={ITEM_H/2} width={COL_W-6} height={ITEM_H/2-1}>
              <div xmlns="http://www.w3.org/1999/xhtml"
                style={{height:'100%',borderRadius:'0 0 6px 6px',overflow:'hidden',
                  background:champion===finalAway&&finalAway?'rgba(245,197,24,0.2)':'rgba(255,255,255,0.05)',
                  border:'1px solid rgba(245,197,24,0.2)',display:'flex',alignItems:'center',gap:5,padding:'0 8px'}}>
                {finalAway&&TEAMS[finalAway]
                  ?<><span style={{fontSize:16}}>{TEAMS[finalAway].flag}</span>
                    <span style={{color:'#fff',fontSize:9,fontWeight:700}}>{TEAMS[finalAway].name}</span></>
                  :<span style={{color:'rgba(255,255,255,0.2)',fontSize:9}}>TBD</span>}
              </div>
            </foreignObject>
            <text x={(COL_W-6)/2} y={ITEM_H+16} textAnchor="middle"
              fill="rgba(245,197,24,0.6)" fontSize={8} fontFamily="Bebas Neue" letterSpacing={2}>
              FINAL · JUL 19 · METLIFE
            </text>
            {champTeam&&(
              <text x={(COL_W-6)/2} y={ITEM_H+30} textAnchor="middle"
                fill="#F5C518" fontSize={10} fontFamily="Outfit" fontWeight={700}>
                🏆 {champTeam.name}
              </text>
            )}
          </g>

          {/* Column labels */}
          {[
            [Lr32X,'R32'],[Lr16X,'R16'],[LqfX,'QF'],[LsfX,'SF'],[finalX,'FINAL'],
            [RsfX,'SF'],[RqfX,'QF'],[Rr16X,'R16'],[Rr32X,'R32'],
          ].map(([x,label])=>(
            <text key={label+x} x={x+(COL_W-6)/2} y={TOTAL_H+16} textAnchor="middle"
              fill="rgba(255,255,255,0.2)" fontSize={8} fontFamily="Bebas Neue" letterSpacing={1.5}>
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
