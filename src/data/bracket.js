// FIFA WC 2026 — Official Knockout Bracket Structure
// R32 matchups sourced from ESPN official schedule

// ── Slot resolver helpers ───────────────────────────────────────────────────
// A "slot" describes which team fills a bracket position.
// Types: 'W' = group winner, 'R' = runner-up, '3rd' = best 3rd from listed groups

export const makeSlot = (type, group, groups3rd) => ({ type, group: group ?? null, groups3rd: groups3rd ?? null });

export const SLOT_LABEL = (slot) => {
  if (slot.type === 'W')   return `Winner Group ${slot.group}`;
  if (slot.type === 'R')   return `Runner-up Group ${slot.group}`;
  if (slot.type === '3rd') return `Best 3rd (${slot.groups3rd})`;
  return 'TBD';
};

// ── Round of 32 (16 official matches) ──────────────────────────────────────
export const R32 = [
  // ── Jun 28 ─────────────────────────────────────────────────────────────
  { id:'r32-1',  homeSlot:makeSlot('R','A'), awaySlot:makeSlot('R','B'),         date:'Jun 28', time:'3:00 PM ET',  venue:'SoFi Stadium, Los Angeles'        },
  // ── Jun 29 ─────────────────────────────────────────────────────────────
  { id:'r32-2',  homeSlot:makeSlot('W','C'), awaySlot:makeSlot('R','F'),         date:'Jun 29', time:'1:00 PM ET',  venue:'NRG Stadium, Houston'             },
  { id:'r32-3',  homeSlot:makeSlot('W','E'), awaySlot:makeSlot('3rd',null,'A/B/C/D/F'), date:'Jun 29', time:'4:30 PM ET',  venue:'Gillette Stadium, Boston'  },
  { id:'r32-4',  homeSlot:makeSlot('W','F'), awaySlot:makeSlot('R','C'),         date:'Jun 29', time:'9:00 PM ET',  venue:'Estadio Monterrey'                },
  // ── Jun 30 ─────────────────────────────────────────────────────────────
  { id:'r32-5',  homeSlot:makeSlot('R','E'), awaySlot:makeSlot('R','I'),         date:'Jun 30', time:'1:00 PM ET',  venue:'AT&T Stadium, Dallas'             },
  { id:'r32-6',  homeSlot:makeSlot('W','I'), awaySlot:makeSlot('3rd',null,'C/D/F/G/H'), date:'Jun 30', time:'5:00 PM ET',  venue:'MetLife Stadium, New York/NJ'},
  { id:'r32-7',  homeSlot:makeSlot('W','A'), awaySlot:makeSlot('3rd',null,'C/E/F/H/I'), date:'Jun 30', time:'9:00 PM ET',  venue:'Mexico City Stadium'        },
  // ── Jul 1 ──────────────────────────────────────────────────────────────
  { id:'r32-8',  homeSlot:makeSlot('W','L'), awaySlot:makeSlot('3rd',null,'E/H/I/J/K'), date:'Jul 1',  time:'12:00 PM ET', venue:'Mercedes-Benz Stadium, Atlanta'},
  { id:'r32-9',  homeSlot:makeSlot('W','G'), awaySlot:makeSlot('3rd',null,'A/E/H/I/J'), date:'Jul 1',  time:'4:00 PM ET',  venue:'Lumen Field, Seattle'        },
  { id:'r32-10', homeSlot:makeSlot('W','D'), awaySlot:makeSlot('3rd',null,'B/E/F/I/J'), date:'Jul 1',  time:'5:00 PM ET',  venue:"Levi's Stadium, San Francisco"},
  // ── Jul 2 ──────────────────────────────────────────────────────────────
  { id:'r32-11', homeSlot:makeSlot('W','B'), awaySlot:makeSlot('R','G'),         date:'Jul 2',  time:'2:00 PM ET',  venue:'AT&T Stadium, Dallas'             },
  { id:'r32-12', homeSlot:makeSlot('W','J'), awaySlot:makeSlot('R','H'),         date:'Jul 2',  time:'6:00 PM ET',  venue:'Hard Rock Stadium, Miami'         },
  { id:'r32-13', homeSlot:makeSlot('W','K'), awaySlot:makeSlot('3rd',null,'D/E/I/J/L'), date:'Jul 2', time:'9:30 PM ET', venue:'Arrowhead Stadium, Kansas City'},
  // ── Jul 3 ──────────────────────────────────────────────────────────────
  { id:'r32-14', homeSlot:makeSlot('W','H'), awaySlot:makeSlot('3rd',null,'B/C/G/K/L'), date:'Jul 3', time:'1:00 PM ET', venue:'BC Place, Vancouver'          },
  { id:'r32-15', homeSlot:makeSlot('R','D'), awaySlot:makeSlot('R','L'),         date:'Jul 3',  time:'5:00 PM ET',  venue:'Lincoln Financial, Philadelphia'  },
  { id:'r32-16', homeSlot:makeSlot('R','J'), awaySlot:makeSlot('R','K'),         date:'Jul 3',  time:'9:00 PM ET',  venue:'AT&T Stadium, Dallas'             },
];

// ── Full bracket tree ────────────────────────────────────────────────────────
// Defines how R32 winners feed into R16, then QF, SF, Final
// "home" / "away" are IDs of the previous-round matches whose winners play here

export const BRACKET = {
  // Round of 16 (8 matches)
  'r16-1': { id:'r16-1', prevHome:'r32-1', prevAway:'r32-7',  date:'Jul 4',  time:'1:00 PM ET',  venue:'NRG Stadium, Houston'               },
  'r16-2': { id:'r16-2', prevHome:'r32-2', prevAway:'r32-3',  date:'Jul 4',  time:'5:00 PM ET',  venue:'Lincoln Financial, Philadelphia'    },
  'r16-3': { id:'r16-3', prevHome:'r32-4', prevAway:'r32-5',  date:'Jul 5',  time:'4:00 PM ET',  venue:'MetLife Stadium, New York/NJ'       },
  'r16-4': { id:'r16-4', prevHome:'r32-6', prevAway:'r32-8',  date:'Jul 5',  time:'8:00 PM ET',  venue:'Mexico City Stadium'                },
  'r16-5': { id:'r16-5', prevHome:'r32-9', prevAway:'r32-10', date:'Jul 6',  time:'3:00 PM ET',  venue:'AT&T Stadium, Dallas'               },
  'r16-6': { id:'r16-6', prevHome:'r32-11',prevAway:'r32-14', date:'Jul 6',  time:'5:00 PM ET',  venue:'Lumen Field, Seattle'               },
  'r16-7': { id:'r16-7', prevHome:'r32-12',prevAway:'r32-13', date:'Jul 7',  time:'12:00 PM ET', venue:'Mercedes-Benz Stadium, Atlanta'     },
  'r16-8': { id:'r16-8', prevHome:'r32-15',prevAway:'r32-16', date:'Jul 7',  time:'4:00 PM ET',  venue:'BC Place, Vancouver'                },

  // Quarterfinals (4 matches)
  'qf-1':  { id:'qf-1',  prevHome:'r16-1', prevAway:'r16-2',  date:'Jul 9',  time:'4:00 PM ET',  venue:'Gillette Stadium, Boston'           },
  'qf-2':  { id:'qf-2',  prevHome:'r16-3', prevAway:'r16-4',  date:'Jul 10', time:'3:00 PM ET',  venue:'SoFi Stadium, Los Angeles'          },
  'qf-3':  { id:'qf-3',  prevHome:'r16-5', prevAway:'r16-6',  date:'Jul 11', time:'4:00 PM ET',  venue:'Mexico City Stadium'                },
  'qf-4':  { id:'qf-4',  prevHome:'r16-7', prevAway:'r16-8',  date:'Jul 12', time:'6:00 PM ET',  venue:'Mercedes-Benz Stadium, Atlanta'     },

  // Semifinals (2 matches)
  'sf-1':  { id:'sf-1',  prevHome:'qf-1',  prevAway:'qf-2',   date:'Jul 14', time:'4:00 PM ET',  venue:'AT&T Stadium, Dallas'               },
  'sf-2':  { id:'sf-2',  prevHome:'qf-3',  prevAway:'qf-4',   date:'Jul 15', time:'8:00 PM ET',  venue:'MetLife Stadium, New York/NJ'       },

  // Final
  'final': { id:'final', prevHome:'sf-1',  prevAway:'sf-2',   date:'Jul 19', time:'4:00 PM ET',  venue:'MetLife Stadium, New York/NJ'       },
};

export const ROUND_ORDER  = ['r32','r16','qf','sf','final'];
export const ROUND_LABELS = { r32:'Round of 32', r16:'Round of 16', qf:'Quarter-Finals', sf:'Semi-Finals', final:'🏆 The Final' };

// Build bracket in-order arrays for the visual
export const LEFT_R32  = ['r32-1','r32-7','r32-2','r32-3','r32-4','r32-5','r32-6','r32-8'];
export const RIGHT_R32 = ['r32-9','r32-10','r32-11','r32-14','r32-12','r32-13','r32-15','r32-16'];
export const LEFT_R16  = ['r16-1','r16-2','r16-3','r16-4'];
export const RIGHT_R16 = ['r16-5','r16-6','r16-7','r16-8'];
export const LEFT_QF   = ['qf-1','qf-2'];
export const RIGHT_QF  = ['qf-3','qf-4'];
