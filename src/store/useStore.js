import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GROUP_NAMES } from '../data/teams.js';
import { R32, BRACKET } from '../data/bracket.js';
import { supabase } from '../lib/supabase.js';

const emptyGroupPicks = () => Object.fromEntries(GROUP_NAMES.map(g=>[g,{first:null,second:null}]));
const emptyRound = ids => Object.fromEntries(ids.map(id=>[id,null]));
const THIRD_IDS = R32.filter(m=>m.homeSlot?.type==='3rd'||m.awaySlot?.type==='3rd').map(m=>m.id);

const useStore = create(persist(
  (set, get) => ({
    // ── Predictions { matchId: {h,a,savedAt} } ─────────────────────────
    predictions: {},
    setPrediction: async (matchId, h, a) => {
      const saved = { h, a, savedAt: new Date().toISOString() };
      set(s => ({ predictions: { ...s.predictions, [matchId]: saved } }));
      // Sync to Supabase
      const userId = get().userId;
      if (supabase && userId) {
        await supabase.from('predictions').upsert({
          user_id: userId, match_id: matchId,
          home_score: h, away_score: a, saved_at: saved.savedAt
        }, { onConflict: 'user_id,match_id' });
      }
    },

    // Load predictions from Supabase after login
    loadPredictions: async (userId) => {
      if (!supabase || !userId) return;
      const { data } = await supabase.from('predictions').select('*').eq('user_id', userId);
      if (data) {
        const preds = {};
        data.forEach(p => { preds[p.match_id] = { h: p.home_score, a: p.away_score, savedAt: p.saved_at }; });
        set({ predictions: preds });
      }
    },

    // ── Current userId (set after auth) ────────────────────────────────
    userId: null,
    setUserId: id => set({ userId: id }),

    // ── Completed match results from API ───────────────────────────────
    completedResults: {},
    setMatchResult: (id, hs, as) => set(s => ({
      completedResults: { ...s.completedResults, [id]: { homeScore: hs, awayScore: as, status: 'FT' } }
    })),

    // ── Bracket picks ──────────────────────────────────────────────────
    bracketPicks: {
      groups: emptyGroupPicks(),
      r32: emptyRound(R32.map(m=>m.id)),
      r16: emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('r16'))),
      qf:  emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('qf'))),
      sf:  emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('sf'))),
      final: null,
    },
    thirdPicks: emptyRound(THIRD_IDS),

    setGroupPick: (group, pos, teamId) => set(s => ({
      bracketPicks: { ...s.bracketPicks, groups: { ...s.bracketPicks.groups, [group]: { ...s.bracketPicks.groups[group], [pos]: teamId } } }
    })),
    setBracketPick: (round, matchId, teamId) => {
      if (round==='final') { set(s=>({bracketPicks:{...s.bracketPicks,final:teamId}})); return; }
      set(s=>({bracketPicks:{...s.bracketPicks,[round]:{...s.bracketPicks[round],[matchId]:teamId}}}));
    },
    setThirdPick: (matchId, teamId) => set(s => ({
      thirdPicks: { ...s.thirdPicks, [matchId]: teamId },
      bracketPicks: { ...s.bracketPicks, r32: { ...s.bracketPicks.r32, [matchId]: null } },
    })),

    // Save bracket to Supabase
    saveBracket: async () => {
      const { bracketPicks, thirdPicks, userId } = get();
      if (!supabase || !userId) return;
      await supabase.from('bracket_picks').upsert({
        user_id: userId, picks: bracketPicks, third_picks: thirdPicks, updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
    },

    loadBracket: async (userId) => {
      if (!supabase || !userId) return;
      const { data } = await supabase.from('bracket_picks').select('*').eq('user_id', userId).maybeSingle();
      if (data) set({ bracketPicks: data.picks, thirdPicks: data.third_picks });
    },

    clearBracket: () => set(() => ({
      bracketPicks: {
        groups: emptyGroupPicks(),
        r32: emptyRound(R32.map(m=>m.id)),
        r16: emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('r16'))),
        qf:  emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('qf'))),
        sf:  emptyRound(Object.keys(BRACKET).filter(k=>k.startsWith('sf'))),
        final: null,
      },
      thirdPicks: emptyRound(THIRD_IDS),
    })),

    liveMinute: 0,
    tickLiveMinute: () => set(s=>({liveMinute:Math.min(s.liveMinute+1,90)})),
  }),
  {
    name: 'fifa-wc26-v3',
    partialize: s => ({
      predictions: s.predictions,
      completedResults: s.completedResults,
      bracketPicks: s.bracketPicks,
      thirdPicks: s.thirdPicks,
      userId: s.userId,
    }),
  }
));
export default useStore;
