import { createContext, useContext } from 'react';
import { useLiveScores } from '../hooks/useLiveScores.js';

const Ctx = createContext(null);

export function LiveScoresProvider({ children }) {
  const scores = useLiveScores();
  return <Ctx.Provider value={scores}>{children}</Ctx.Provider>;
}

export const useLiveScoresContext = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLiveScoresContext must be used inside LiveScoresProvider');
  return ctx;
};
