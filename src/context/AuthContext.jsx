import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isOnline } from '../lib/supabase.js';

const Ctx = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    if (!isOnline()) { setLoading(false); return; }
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: profile } = await supabase.from('profiles').select('id, username, avatar').eq('id', session.user.id).single();
        if (profile) setUser(profile);
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') { setUser(null); return; }
      if (session && event === 'SIGNED_IN') {
        const { data: profile } = await supabase.from('profiles').select('id, username, avatar').eq('id', session.user.id).single();
        if (profile) setUser(profile);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const register = useCallback(async (username, password, avatar) => {
    setError('');
    if (!isOnline()) { setError('No Supabase connection — check .env setup'); return false; }
    const { data: exists } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle();
    if (exists) { setError('Username already taken — choose another'); return false; }
    const fakeEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@wc26app.internal`;
    const { data: auth, error: authErr } = await supabase.auth.signUp({ email: fakeEmail, password });
    if (authErr) { setError(authErr.message); return false; }
    const { error: profErr } = await supabase.from('profiles').insert({ id: auth.user.id, username, avatar });
    if (profErr) { setError(profErr.message); return false; }
    setUser({ id: auth.user.id, username, avatar });
    return true;
  }, []);

  const login = useCallback(async (username, password) => {
    setError('');
    if (!isOnline()) { setError('No Supabase connection — check .env setup'); return false; }
    const { data: profile } = await supabase.from('profiles').select('id').eq('username', username).maybeSingle();
    if (!profile) { setError('Username not found'); return false; }
    const fakeEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@wc26app.internal`;
    const { error: signInErr } = await supabase.auth.signInWithPassword({ email: fakeEmail, password });
    if (signInErr) { setError('Incorrect password'); return false; }
    const { data: full } = await supabase.from('profiles').select('id, username, avatar').eq('id', profile.id).single();
    if (full) setUser(full);
    return true;
  }, []);

  const logout = useCallback(async () => {
    await supabase?.auth.signOut();
    setUser(null);
  }, []);

  // Delete account — removes profile (cascades to predictions + bracket_picks) then signs out
  const deleteAccount = useCallback(async () => {
    if (!supabase || !user) return false;
    try {
      const { error: delErr } = await supabase.from('profiles').delete().eq('id', user.id);
      if (delErr) { setError(delErr.message); return false; }
      await supabase.auth.signOut();
      setUser(null);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    }
  }, [user]);

  return (
    <Ctx.Provider value={{ user, loading, error, setError, register, login, logout, deleteAccount }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
