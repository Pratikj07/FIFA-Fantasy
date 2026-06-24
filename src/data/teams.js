// FIFA World Cup 2026 — 48 Qualified Teams
// iso2: ISO 3166-1 alpha-2 code for flagcdn.com images
export const TEAMS = {
  // ── Group A ─────────────────────────────────────────────────────
  mex: { name:'Mexico',        short:'MEX', flag:'🇲🇽', iso2:'mx', group:'A', strength:7 },
  kor: { name:'South Korea',   short:'KOR', flag:'🇰🇷', iso2:'kr', group:'A', strength:5 },
  rsa: { name:'South Africa',  short:'RSA', flag:'🇿🇦', iso2:'za', group:'A', strength:3 },
  cze: { name:'Czechia',       short:'CZE', flag:'🇨🇿', iso2:'cz', group:'A', strength:5 },
  // ── Group B ─────────────────────────────────────────────────────
  can: { name:'Canada',        short:'CAN', flag:'🇨🇦', iso2:'ca', group:'B', strength:5 },
  bih: { name:'Bosnia & Herz.',short:'BIH', flag:'🇧🇦', iso2:'ba', group:'B', strength:5 },
  qat: { name:'Qatar',         short:'QAT', flag:'🇶🇦', iso2:'qa', group:'B', strength:4 },
  sui: { name:'Switzerland',   short:'SUI', flag:'🇨🇭', iso2:'ch', group:'B', strength:7 },
  // ── Group C ─────────────────────────────────────────────────────
  bra: { name:'Brazil',        short:'BRA', flag:'🇧🇷', iso2:'br', group:'C', strength:9 },
  mar: { name:'Morocco',       short:'MAR', flag:'🇲🇦', iso2:'ma', group:'C', strength:7 },
  sco: { name:'Scotland',      short:'SCO', flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', iso2:'gb-sct', group:'C', strength:5 },
  hai: { name:'Haiti',         short:'HAI', flag:'🇭🇹', iso2:'ht', group:'C', strength:2 },
  // ── Group D ─────────────────────────────────────────────────────
  usa: { name:'United States', short:'USA', flag:'🇺🇸', iso2:'us', group:'D', strength:6 },
  par: { name:'Paraguay',      short:'PAR', flag:'🇵🇾', iso2:'py', group:'D', strength:4 },
  aus: { name:'Australia',     short:'AUS', flag:'🇦🇺', iso2:'au', group:'D', strength:5 },
  tur: { name:'Türkiye',       short:'TUR', flag:'🇹🇷', iso2:'tr', group:'D', strength:6 },
  // ── Group E ─────────────────────────────────────────────────────
  ger: { name:'Germany',       short:'GER', flag:'🇩🇪', iso2:'de', group:'E', strength:9 },
  ecu: { name:'Ecuador',       short:'ECU', flag:'🇪🇨', iso2:'ec', group:'E', strength:4 },
  civ: { name:'Ivory Coast',   short:'CIV', flag:'🇨🇮', iso2:'ci', group:'E', strength:5 },
  cuw: { name:'Curaçao',       short:'CUW', flag:'🇨🇼', iso2:'cw', group:'E', strength:2 },
  // ── Group F ─────────────────────────────────────────────────────
  ned: { name:'Netherlands',   short:'NED', flag:'🇳🇱', iso2:'nl', group:'F', strength:8 },
  jpn: { name:'Japan',         short:'JPN', flag:'🇯🇵', iso2:'jp', group:'F', strength:6 },
  tun: { name:'Tunisia',       short:'TUN', flag:'🇹🇳', iso2:'tn', group:'F', strength:4 },
  swe: { name:'Sweden',        short:'SWE', flag:'🇸🇪', iso2:'se', group:'F', strength:6 },
  // ── Group G ─────────────────────────────────────────────────────
  bel: { name:'Belgium',       short:'BEL', flag:'🇧🇪', iso2:'be', group:'G', strength:8 },
  irn: { name:'Iran',          short:'IRN', flag:'🇮🇷', iso2:'ir', group:'G', strength:5 },
  egy: { name:'Egypt',         short:'EGY', flag:'🇪🇬', iso2:'eg', group:'G', strength:5 },
  nzl: { name:'New Zealand',   short:'NZL', flag:'🇳🇿', iso2:'nz', group:'G', strength:3 },
  // ── Group H ─────────────────────────────────────────────────────
  esp: { name:'Spain',         short:'ESP', flag:'🇪🇸', iso2:'es', group:'H', strength:9 },
  ury: { name:'Uruguay',       short:'URU', flag:'🇺🇾', iso2:'uy', group:'H', strength:6 },
  ksa: { name:'Saudi Arabia',  short:'KSA', flag:'🇸🇦', iso2:'sa', group:'H', strength:5 },
  cpv: { name:'Cape Verde',    short:'CPV', flag:'🇨🇻', iso2:'cv', group:'H', strength:3 },
  // ── Group I ─────────────────────────────────────────────────────
  fra: { name:'France',        short:'FRA', flag:'🇫🇷', iso2:'fr', group:'I', strength:9 },
  sen: { name:'Senegal',       short:'SEN', flag:'🇸🇳', iso2:'sn', group:'I', strength:6 },
  nor: { name:'Norway',        short:'NOR', flag:'🇳🇴', iso2:'no', group:'I', strength:6 },
  irq: { name:'Iraq',          short:'IRQ', flag:'🇮🇶', iso2:'iq', group:'I', strength:3 },
  // ── Group J ─────────────────────────────────────────────────────
  arg: { name:'Argentina',     short:'ARG', flag:'🇦🇷', iso2:'ar', group:'J', strength:9 },
  aut: { name:'Austria',       short:'AUT', flag:'🇦🇹', iso2:'at', group:'J', strength:6 },
  alg: { name:'Algeria',       short:'ALG', flag:'🇩🇿', iso2:'dz', group:'J', strength:5 },
  jor: { name:'Jordan',        short:'JOR', flag:'🇯🇴', iso2:'jo', group:'J', strength:3 },
  // ── Group K ─────────────────────────────────────────────────────
  por: { name:'Portugal',      short:'POR', flag:'🇵🇹', iso2:'pt', group:'K', strength:8 },
  col: { name:'Colombia',      short:'COL', flag:'🇨🇴', iso2:'co', group:'K', strength:7 },
  uzb: { name:'Uzbekistan',    short:'UZB', flag:'🇺🇿', iso2:'uz', group:'K', strength:4 },
  cod: { name:'DR Congo',      short:'COD', flag:'🇨🇩', iso2:'cd', group:'K', strength:4 },
  // ── Group L ─────────────────────────────────────────────────────
  eng: { name:'England',       short:'ENG', flag:'🏴󠁧󠁢󠁥󠁮󠁧󠁿', iso2:'gb-eng', group:'L', strength:9 },
  cro: { name:'Croatia',       short:'CRO', flag:'🇭🇷', iso2:'hr', group:'L', strength:7 },
  pan: { name:'Panama',        short:'PAN', flag:'🇵🇦', iso2:'pa', group:'L', strength:4 },
  gha: { name:'Ghana',         short:'GHA', flag:'🇬🇭', iso2:'gh', group:'L', strength:5 },
};

export const GROUP_NAMES    = ['A','B','C','D','E','F','G','H','I','J','K','L'];
export const getTeamsByGroup = (g) => Object.entries(TEAMS).filter(([,t])=>t.group===g).map(([id,t])=>({id,...t}));
