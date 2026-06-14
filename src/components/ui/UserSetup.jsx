import { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore.js';
import { AVATARS } from '../../data/botUsers.js';
import { BOT_USERS } from '../../data/botUsers.js';

const TAKEN = new Set(BOT_USERS.map(b => b.username.toLowerCase()));

export default function UserSetup() {
  const { setUser } = useStore();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('⚽');
  const [err, setErr] = useState('');

  const validate = (v) => {
    if (!v.trim()) return 'Please enter a username';
    if (v.trim().length < 2) return 'Username must be at least 2 characters';
    if (v.trim().length > 20) return 'Username must be 20 characters or less';
    if (TAKEN.has(v.trim().toLowerCase())) return 'That username is taken — try another';
    if (!/^[a-zA-Z0-9 _-]+$/.test(v.trim())) return 'Only letters, numbers, spaces, _ and - allowed';
    return '';
  };

  const submit = () => {
    const error = validate(name);
    if (error) { setErr(error); return; }
    setUser({ id: `user-${Date.now()}`, username: name.trim(), avatar });
  };

  return (
    <div className="min-h-screen bg-wc-bg flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(245,197,24,0.07) 0%, transparent 65%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-card-gold p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="font-display text-5xl text-wc-gold tracking-widest">WC26</h1>
          <p className="font-display text-2xl text-white tracking-widest">PREDICTOR</p>
          <p className="text-white/40 text-sm mt-2">FIFA World Cup 2026 · Mexico · Canada · USA</p>
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Your Username</label>
            <input
              type="text" value={name}
              onChange={e => { setName(e.target.value); setErr(''); }}
              onKeyDown={e => e.key === 'Enter' && submit()}
              placeholder="e.g. GoalMachine99"
              maxLength={20}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-wc-gold/50 focus:bg-wc-gold/5 transition-all"
            />
            {err
              ? <p className="text-wc-red text-xs mt-1.5">{err}</p>
              : <p className="text-white/25 text-[10px] mt-1.5">2–20 chars · letters, numbers, spaces, _ and -</p>
            }
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Pick Your Avatar</label>
            <div className="grid grid-cols-10 gap-1.5">
              {AVATARS.map(a => (
                <button key={a} onClick={() => setAvatar(a)}
                  className={`text-2xl p-1.5 rounded-lg transition-all ${avatar === a ? 'bg-wc-gold/20 ring-2 ring-wc-gold scale-110' : 'bg-white/5 hover:bg-white/10'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <button onClick={submit} className="btn-gold w-full text-lg py-3 font-display tracking-widest">
            JOIN THE TOURNAMENT
          </button>
        </div>
        <p className="text-center text-white/20 text-xs mt-6">Predict · Compete · Win · Free to play</p>
      </motion.div>
    </div>
  );
}
