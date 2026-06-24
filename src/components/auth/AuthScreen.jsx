import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { AVATARS } from '../../data/botUsers.js';

const Input = ({ label, type, value, onChange, placeholder, maxLength, right }) => {
  const [show, setShow] = useState(false);
  const actualType = type === 'password' ? (show ? 'text' : 'password') : type;
  return (
    <div>
      <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">{label}</label>
      <div className="relative">
        <input type={actualType} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20
                     focus:outline-none focus:border-wc-gold/50 focus:bg-wc-gold/5 transition-all pr-10" />
        {type === 'password' && (
          <button type="button" onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
            {show ? <EyeOff size={15}/> : <Eye size={15}/>}
          </button>
        )}
      </div>
    </div>
  );
};

function RegisterForm() {
  const { register, error, setError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [avatar,   setAvatar]   = useState('⚽');
  const [busy,     setBusy]     = useState(false);
  const [localErr, setLocalErr] = useState('');

  const submit = async () => {
    setLocalErr(''); setError('');
    if (!username.trim()) { setLocalErr('Enter a username'); return; }
    if (username.trim().length < 2) { setLocalErr('At least 2 characters'); return; }
    if (!/^[a-zA-Z0-9 _-]+$/.test(username.trim())) { setLocalErr('Only letters, numbers, spaces, _ and -'); return; }
    if (password.length < 6) { setLocalErr('Password must be at least 6 characters'); return; }
    if (password !== confirm) { setLocalErr('Passwords do not match'); return; }
    setBusy(true);
    await register(username.trim(), password, avatar);
    setBusy(false);
  };

  const err = localErr || error;

  return (
    <div className="space-y-4">
      <Input label="Username" type="text" value={username} onChange={e => { setUsername(e.target.value); setLocalErr(''); }}
        placeholder="e.g. GoalMachine99" maxLength={20} />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
      <Input label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" />
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Pick Your Avatar</label>
        <div className="grid grid-cols-10 gap-1.5">
          {AVATARS.map(a => (
            <button key={a} type="button" onClick={() => setAvatar(a)}
              className={`text-2xl p-1.5 rounded-lg transition-all ${avatar===a?'bg-wc-gold/20 ring-2 ring-wc-gold scale-110':'bg-white/5 hover:bg-white/10'}`}>
              {a}
            </button>
          ))}
        </div>
      </div>
      {err && <p className="text-wc-red text-xs text-center">{err}</p>}
      <button onClick={submit} disabled={busy}
        className="btn-gold w-full py-3 text-lg font-display tracking-widest flex items-center justify-center gap-2">
        {busy ? <><Loader size={16} className="animate-spin"/> Creating account…</> : 'JOIN THE TOURNAMENT'}
      </button>
    </div>
  );
}

function LoginForm() {
  const { login, error, setError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy,     setBusy]     = useState(false);

  const submit = async () => {
    setError('');
    if (!username.trim() || !password) { return; }
    setBusy(true);
    await login(username.trim(), password);
    setBusy(false);
  };

  return (
    <div className="space-y-4">
      <Input label="Username" type="text" value={username} onChange={e => { setUsername(e.target.value); setError(''); }}
        placeholder="Your username" />
      <Input label="Password" type="password" value={password}
        onChange={e => { setPassword(e.target.value); setError(''); }}
        placeholder="Your password" />
      {error && <p className="text-wc-red text-xs text-center">{error}</p>}
      <button onClick={submit} disabled={busy}
        className="btn-gold w-full py-3 text-lg font-display tracking-widest flex items-center justify-center gap-2"
        onKeyDown={e => e.key === 'Enter' && submit()}>
        {busy ? <><Loader size={16} className="animate-spin"/> Signing in…</> : 'SIGN IN'}
      </button>
    </div>
  );
}

export default function AuthScreen() {
  const [tab, setTab] = useState('login');

  return (
    <div className="min-h-screen bg-wc-bg flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(245,197,24,0.07) 0%, transparent 65%)' }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card-gold p-8">
        {/* Logo */}
        <div className="text-center mb-7">
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="font-display text-5xl text-wc-gold tracking-widest">WC26</h1>
          <p className="font-display text-xl text-white tracking-widest">PREDICTOR</p>
          <p className="text-white/40 text-sm mt-1.5">FIFA World Cup 2026 · Mexico · Canada · USA</p>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-white/5 p-1 mb-6">
          {[['login','Sign In'],['register','Register']].map(([t, l]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab===t?'bg-wc-gold text-wc-bg':'text-white/50 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: tab==='login'?-20:20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            {tab === 'login' ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-white/20 text-xs mt-5">
          {tab==='login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setTab(tab==='login'?'register':'login')} className="text-wc-gold underline">
            {tab==='login' ? 'Register free' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
