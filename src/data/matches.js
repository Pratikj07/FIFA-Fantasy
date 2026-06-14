// FIFA World Cup 2026 — Official Match Schedule (72 Group Stage Matches)
// All matches start as UPCOMING; live status comes from football-data.org API

const M = (id,home,away,group,md,date,time,venue) =>
  ({ id, home, away, group, matchday:md, date, time, venue, status:'UPCOMING', homeScore:null, awayScore:null, minute:null });

export const MATCHES = [
  // ── Group A ──────────────────────────────────────────────────────────
  M('A1_mex_rsa','mex','rsa','A',1,'Jun 11','3:00 PM','Mexico City Stadium'),
  M('A1_kor_cze','kor','cze','A',1,'Jun 11','10:00 PM','Estadio Guadalajara'),
  M('A2_cze_rsa','cze','rsa','A',2,'Jun 18','1:00 PM','Mercedes-Benz Stadium, Atlanta'),
  M('A2_mex_kor','mex','kor','A',2,'Jun 18','10:00 PM','Estadio Guadalajara'),
  M('A3_cze_mex','cze','mex','A',3,'Jun 24','9:00 PM','Mexico City Stadium'),
  M('A3_rsa_kor','rsa','kor','A',3,'Jun 24','9:00 PM','Estadio Monterrey'),
  // ── Group B ──────────────────────────────────────────────────────────
  M('B1_can_bih','can','bih','B',1,'Jun 12','3:00 PM','BMO Field, Toronto'),
  M('B1_qat_sui','qat','sui','B',1,'Jun 13','3:00 PM',"Levi's Stadium, San Francisco"),
  M('B2_sui_bih','sui','bih','B',2,'Jun 18','4:00 PM','SoFi Stadium, Los Angeles'),
  M('B2_can_qat','can','qat','B',2,'Jun 18','7:00 PM','BC Place, Vancouver'),
  M('B3_sui_can','sui','can','B',3,'Jun 24','3:00 PM','BC Place, Vancouver'),
  M('B3_qat_bih','qat','bih','B',3,'Jun 24','3:00 PM','Lumen Field, Seattle'),
  // ── Group C ──────────────────────────────────────────────────────────
  M('C1_bra_mar','bra','mar','C',1,'Jun 13','6:00 PM','MetLife Stadium, New York/NJ'),
  M('C1_hai_sco','hai','sco','C',1,'Jun 13','9:00 PM','Gillette Stadium, Boston'),
  M('C2_sco_mar','sco','mar','C',2,'Jun 19','6:00 PM','Gillette Stadium, Boston'),
  M('C2_bra_hai','bra','hai','C',2,'Jun 19','9:00 PM','Lincoln Financial, Philadelphia'),
  M('C3_sco_bra','sco','bra','C',3,'Jun 24','6:00 PM','Hard Rock Stadium, Miami'),
  M('C3_mar_hai','mar','hai','C',3,'Jun 24','6:00 PM','Mercedes-Benz Stadium, Atlanta'),
  // ── Group D ──────────────────────────────────────────────────────────
  M('D1_usa_par','usa','par','D',1,'Jun 12','9:00 PM','SoFi Stadium, Los Angeles'),
  M('D1_aus_tur','aus','tur','D',1,'Jun 14','12:00 AM','BC Place, Vancouver'),
  M('D2_usa_aus','usa','aus','D',2,'Jun 19','3:00 PM','Lumen Field, Seattle'),
  M('D2_tur_par','tur','par','D',2,'Jun 19','12:00 AM',"Levi's Stadium, San Francisco"),
  M('D3_tur_usa','tur','usa','D',3,'Jun 25','10:00 PM','SoFi Stadium, Los Angeles'),
  M('D3_par_aus','par','aus','D',3,'Jun 25','10:00 PM',"Levi's Stadium, San Francisco"),
  // ── Group E ──────────────────────────────────────────────────────────
  M('E1_ger_cuw','ger','cuw','E',1,'Jun 14','1:00 PM','NRG Stadium, Houston'),
  M('E1_civ_ecu','civ','ecu','E',1,'Jun 14','7:00 PM','Lincoln Financial, Philadelphia'),
  M('E2_ger_civ','ger','civ','E',2,'Jun 20','4:00 PM','BMO Field, Toronto'),
  M('E2_ecu_cuw','ecu','cuw','E',2,'Jun 20','8:00 PM','Arrowhead Stadium, Kansas City'),
  M('E3_ecu_ger','ecu','ger','E',3,'Jun 25','4:00 PM','MetLife Stadium, New York/NJ'),
  M('E3_cuw_civ','cuw','civ','E',3,'Jun 25','4:00 PM','Lincoln Financial, Philadelphia'),
  // ── Group F ──────────────────────────────────────────────────────────
  M('F1_ned_jpn','ned','jpn','F',1,'Jun 14','4:00 PM','AT&T Stadium, Dallas'),
  M('F1_swe_tun','swe','tun','F',1,'Jun 14','10:00 PM','Estadio Monterrey'),
  M('F2_ned_swe','ned','swe','F',2,'Jun 20','1:00 PM','NRG Stadium, Houston'),
  M('F2_tun_jpn','tun','jpn','F',2,'Jun 20','12:00 AM','Estadio Monterrey'),
  M('F3_jpn_swe','jpn','swe','F',3,'Jun 25','7:00 PM','AT&T Stadium, Dallas'),
  M('F3_tun_ned','tun','ned','F',3,'Jun 25','7:00 PM','Arrowhead Stadium, Kansas City'),
  // ── Group G ──────────────────────────────────────────────────────────
  M('G1_bel_egy','bel','egy','G',1,'Jun 15','7:00 PM','BC Place, Vancouver'),
  M('G1_irn_nzl','irn','nzl','G',1,'Jun 15','12:00 AM','SoFi Stadium, Los Angeles'),
  M('G2_bel_irn','bel','irn','G',2,'Jun 21','7:00 PM','SoFi Stadium, Los Angeles'),
  M('G2_nzl_egy','nzl','egy','G',2,'Jun 21','12:00 AM','BC Place, Vancouver'),
  M('G3_egy_irn','egy','irn','G',3,'Jun 26','11:00 PM','Lumen Field, Seattle'),
  M('G3_nzl_bel','nzl','bel','G',3,'Jun 26','11:00 PM','BC Place, Vancouver'),
  // ── Group H ──────────────────────────────────────────────────────────
  M('H1_esp_cpv','esp','cpv','H',1,'Jun 15','1:00 PM','Mercedes-Benz Stadium, Atlanta'),
  M('H1_ksa_ury','ksa','ury','H',1,'Jun 15','7:00 PM','Hard Rock Stadium, Miami'),
  M('H2_esp_ksa','esp','ksa','H',2,'Jun 21','1:00 PM','Mercedes-Benz Stadium, Atlanta'),
  M('H2_ury_cpv','ury','cpv','H',2,'Jun 21','7:00 PM','Hard Rock Stadium, Miami'),
  M('H3_cpv_ksa','cpv','ksa','H',3,'Jun 26','8:00 PM','NRG Stadium, Houston'),
  M('H3_ury_esp','ury','esp','H',3,'Jun 26','8:00 PM','Estadio Guadalajara'),
  // ── Group I ──────────────────────────────────────────────────────────
  M('I1_fra_sen','fra','sen','I',1,'Jun 16','3:00 PM','MetLife Stadium, New York/NJ'),
  M('I1_irq_nor','irq','nor','I',1,'Jun 16','6:00 PM','Gillette Stadium, Boston'),
  M('I2_fra_irq','fra','irq','I',2,'Jun 22','5:00 PM','Lincoln Financial, Philadelphia'),
  M('I2_nor_sen','nor','sen','I',2,'Jun 22','8:00 PM','MetLife Stadium, New York/NJ'),
  M('I3_nor_fra','nor','fra','I',3,'Jun 26','3:00 PM','Gillette Stadium, Boston'),
  M('I3_sen_irq','sen','irq','I',3,'Jun 26','3:00 PM','BMO Field, Toronto'),
  // ── Group J ──────────────────────────────────────────────────────────
  M('J1_arg_alg','arg','alg','J',1,'Jun 16','9:00 PM','Arrowhead Stadium, Kansas City'),
  M('J1_aut_jor','aut','jor','J',1,'Jun 16','12:00 AM',"Levi's Stadium, San Francisco"),
  M('J2_arg_aut','arg','aut','J',2,'Jun 22','1:00 PM','AT&T Stadium, Dallas'),
  M('J2_jor_alg','jor','alg','J',2,'Jun 22','11:00 PM',"Levi's Stadium, San Francisco"),
  M('J3_alg_aut','alg','aut','J',3,'Jun 27','10:00 PM','Arrowhead Stadium, Kansas City'),
  M('J3_jor_arg','jor','arg','J',3,'Jun 27','10:00 PM','AT&T Stadium, Dallas'),
  // ── Group K ──────────────────────────────────────────────────────────
  M('K1_por_cod','por','cod','K',1,'Jun 17','1:00 PM','NRG Stadium, Houston'),
  M('K1_uzb_col','uzb','col','K',1,'Jun 17','10:00 PM','Mexico City Stadium'),
  M('K2_por_uzb','por','uzb','K',2,'Jun 23','1:00 PM','NRG Stadium, Houston'),
  M('K2_col_cod','col','cod','K',2,'Jun 23','10:00 PM','Estadio Guadalajara'),
  M('K3_col_por','col','por','K',3,'Jun 27','7:30 PM','Hard Rock Stadium, Miami'),
  M('K3_cod_uzb','cod','uzb','K',3,'Jun 27','7:30 PM','Mercedes-Benz Stadium, Atlanta'),
  // ── Group L ──────────────────────────────────────────────────────────
  M('L1_eng_cro','eng','cro','L',1,'Jun 17','4:00 PM','AT&T Stadium, Dallas'),
  M('L1_gha_pan','gha','pan','L',1,'Jun 17','7:00 PM','BMO Field, Toronto'),
  M('L2_eng_gha','eng','gha','L',2,'Jun 23','4:00 PM','Gillette Stadium, Boston'),
  M('L2_pan_cro','pan','cro','L',2,'Jun 23','7:00 PM','BMO Field, Toronto'),
  M('L3_pan_eng','pan','eng','L',3,'Jun 27','5:00 PM','MetLife Stadium, New York/NJ'),
  M('L3_cro_gha','cro','gha','L',3,'Jun 27','5:00 PM','Lincoln Financial, Philadelphia'),
];

export const getMatchesByGroup  = g  => MATCHES.filter(m => m.group === g);
export const getMatchById       = id => MATCHES.find(m => m.id === id);
export const effectiveStatus = (match, liveData) => liveData?.[match.id]?.status ?? match.status;
