import { useState, useEffect, useCallback, useRef } from 'react';
import { ALL_MATCHES } from '../data/matches.js';
import useStore from '../store/useStore.js';

const TLA={MEX:'mex',KOR:'kor',RSA:'rsa',CZE:'cze',CAN:'can',BIH:'bih',QAT:'qat',SUI:'sui',
  BRA:'bra',MAR:'mar',SCO:'sco',HAI:'hai',USA:'usa',PAR:'par',AUS:'aus',TUR:'tur',
  GER:'ger',ECU:'ecu',CIV:'civ',CUW:'cuw',NED:'ned',JPN:'jpn',TUN:'tun',SWE:'swe',
  BEL:'bel',IRN:'irn',EGY:'egy',NZL:'nzl',ESP:'esp',URU:'ury',KSA:'ksa',CPV:'cpv',
  FRA:'fra',SEN:'sen',NOR:'nor',IRQ:'irq',ARG:'arg',AUT:'aut',ALG:'alg',JOR:'jor',
  POR:'por',COL:'col',UZB:'uzb',COD:'cod',ENG:'eng',CRO:'cro',PAN:'pan',GHA:'gha'};
const NAME={'Mexico':'mex','South Korea':'kor','Korea Republic':'kor','South Africa':'rsa',
  'Czechia':'cze','Czech Republic':'cze','Canada':'can','Bosnia and Herzegovina':'bih',
  'Qatar':'qat','Switzerland':'sui','Brazil':'bra','Morocco':'mar','Scotland':'sco',
  'Haiti':'hai','United States':'usa','USA':'usa','Paraguay':'par','Australia':'aus',
  'Turkey':'tur','Türkiye':'tur','Germany':'ger','Ecuador':'ecu','Ivory Coast':'civ',
  "Côte d'Ivoire":'civ','Curaçao':'cuw','Netherlands':'ned','Japan':'jpn','Tunisia':'tun',
  'Sweden':'swe','Belgium':'bel','Iran':'irn','Egypt':'egy','New Zealand':'nzl','Spain':'esp',
  'Uruguay':'ury','Saudi Arabia':'ksa','Cape Verde':'cpv','France':'fra','Senegal':'sen',
  'Norway':'nor','Iraq':'irq','Argentina':'arg','Austria':'aut','Algeria':'alg','Jordan':'jor',
  'Portugal':'por','Colombia':'col','Uzbekistan':'uzb','DR Congo':'cod',
  'Democratic Republic of Congo':'cod','England':'eng','Croatia':'cro','Panama':'pan','Ghana':'gha'};

const rid=(tla,name)=>TLA[tla?.toUpperCase()]??NAME[name]??null;
const fdSt=s=>['IN_PLAY','PAUSED','SUSPENDED'].includes(s)?'LIVE':['FINISHED','AWARDED'].includes(s)?'FT':'UPCOMING';

// Always use our own server-side proxy — API key never exposed to client
const ENDPOINT = '/api/scores';

export function useLiveScores() {
  const { setMatchResult } = useStore();
  const [liveData,  setLiveData]  = useState({});
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  const timer = useRef(null);

  const fetch_ = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res  = await fetch(ENDPOINT);
      if (!res.ok) throw new Error(`Scores service error ${res.status}`);
      const data = await res.json();
      const upd  = {};
      for (const m of (data.matches ?? [])) {
        const hId = rid(m.homeTeam?.tla, m.homeTeam?.name);
        const aId = rid(m.awayTeam?.tla, m.awayTeam?.name);
        if (!hId || !aId) continue;
        const our = ALL_MATCHES.find(x => x.home===hId && x.away===aId);
        if (!our) continue;
        const st  = fdSt(m.status);
        const hs  = m.score?.fullTime?.home  ?? m.score?.halfTime?.home  ?? null;
        const as_ = m.score?.fullTime?.away  ?? m.score?.halfTime?.away  ?? null;
        upd[our.id] = { status: st, homeScore: hs, awayScore: as_, minute: m.minute ?? null };
        if (st === 'FT' && hs !== null) setMatchResult(our.id, hs, as_);
      }
      setLiveData(upd);
      setLastFetch(new Date());
    } catch (e) { setError(e.message); }
    finally    { setLoading(false); }
  }, [setMatchResult]);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    fetch_();
    const hasLive = Object.values(liveData).some(d => d.status === 'LIVE');
    timer.current = setInterval(fetch_, hasLive ? 30_000 : 90_000);
    return () => clearInterval(timer.current);
  }, [fetch_]);

  const resolveMatch = useCallback((match) => {
    const api    = liveData[match.id];
    if (api) return { ...match, ...api };
    const cached = useStore.getState().completedResults[match.id];
    if (cached) return { ...match, ...cached };
    return match;
  }, [liveData]);

  return { liveData, loading, error, lastFetch, refetch: fetch_, resolveMatch };
}
