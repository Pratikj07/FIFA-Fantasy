import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Activity, Target, Trophy, GitBranch, LogOut, Trash2, X, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV = [
  {to:'/',            icon:Home,      label:'Home'},
  {to:'/scores',      icon:Activity,  label:'Scores'},
  {to:'/predictions', icon:Target,    label:'Predict'},
  {to:'/bracket',     icon:GitBranch, label:'Bracket'},
  {to:'/leaderboard', icon:Trophy,    label:'Board'},
];

const dCls = ({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive?'bg-wc-gold/15 text-wc-gold border border-wc-gold/30':'text-white/50 hover:text-white hover:bg-white/5'}`;
const mCls = ({isActive}) => `flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors ${isActive?'text-wc-gold':'text-white/40 hover:text-white/70'}`;

function DeleteConfirmModal({ onConfirm, onCancel, busy }) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4 sm:pb-0"
      onClick={onCancel}>
      <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}}
        onClick={e=>e.stopPropagation()}
        className="w-full max-w-sm glass-card p-6 border border-wc-red/30 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-wc-red shrink-0 mt-0.5"/>
          <div>
            <p className="text-white font-bold">Delete Account?</p>
            <p className="text-white/50 text-sm mt-1">
              This permanently deletes your account, all predictions, and bracket picks. This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onConfirm} disabled={busy}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-wc-red/20 text-wc-red border border-wc-red/40 hover:bg-wc-red/30 transition-all">
            {busy ? 'Deleting…' : 'Yes, delete everything'}
          </button>
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white/8 text-white/70 hover:bg-white/12 transition-all">
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProfileSheet({ onClose }) {
  const { user, logout, deleteAccount } = useAuth();
  const [showDelete, setShowDelete] = useState(false);
  const [delBusy,    setDelBusy]    = useState(false);

  const handleDelete = async () => {
    setDelBusy(true);
    await deleteAccount();
    setDelBusy(false);
  };

  return (
    <>
      <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <motion.div initial={{y:'100%'}} animate={{y:0}} exit={{y:'100%'}} transition={{type:'spring',damping:30,stiffness:300}}
        className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-t-2xl border-t border-wc-gold/20 p-5 space-y-3"
        onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Account</p>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors"><X size={16}/></button>
        </div>
        {/* User card */}
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-wc-gold/8 border border-wc-gold/20">
          <span className="text-3xl">{user?.avatar}</span>
          <div>
            <p className="text-white font-bold">{user?.username}</p>
            <p className="text-white/30 text-xs">WC26 Predictor</p>
          </div>
        </div>
        {/* Sign out */}
        <button onClick={()=>{logout();onClose();}}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-medium">
          <LogOut size={16}/> Sign Out
        </button>
        {/* Delete account */}
        <button onClick={()=>setShowDelete(true)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-wc-red/8 hover:bg-wc-red/15 text-wc-red transition-all text-sm font-medium border border-wc-red/20">
          <Trash2 size={16}/> Delete Account
        </button>
        <p className="text-white/20 text-[10px] text-center">Deleting your account removes all predictions permanently</p>
      </motion.div>

      <AnimatePresence>
        {showDelete && <DeleteConfirmModal onConfirm={handleDelete} onCancel={()=>setShowDelete(false)} busy={delBusy}/>}
      </AnimatePresence>
    </>
  );
}

export default function Navbar() {
  const { user, logout, deleteAccount } = useAuth();
  const [profileOpen, setProfileOpen]   = useState(false);
  const [showDelete,  setShowDelete]    = useState(false);
  const [delBusy,     setDelBusy]       = useState(false);

  const handleDelete = async () => {
    setDelBusy(true);
    await deleteAccount();
    setDelBusy(false);
  };

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-wc-surface border-r border-white/5 z-40 p-5">
        <div className="mb-8">
          <div className="text-wc-gold font-display text-3xl tracking-wide leading-none">FIFA</div>
          <div className="text-white font-display text-xl tracking-widest">WC 2026</div>
          <div className="text-white/30 text-xs mt-1">MEXICO · CANADA · USA</div>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map(({to,icon:Icon,label})=>(
            <NavLink key={to} to={to} className={dCls} end={to==='/'}>
              <Icon size={18}/>{label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-wc-gold/8 border border-wc-gold/20">
              <span className="text-2xl">{user.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                <p className="text-[10px] text-white/40">WC26 Predictor</p>
              </div>
            </div>
            <button onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-wc-red hover:bg-wc-red/8 transition-all text-xs">
              <LogOut size={12}/> Sign out
            </button>
            <button onClick={()=>setShowDelete(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/30 hover:text-wc-red hover:bg-wc-red/8 transition-all text-xs">
              <Trash2 size={12}/> Delete account
            </button>
          </div>
        )}
      </aside>

      {/* ── Mobile top bar ──────────────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-wc-surface/95 backdrop-blur border-b border-white/5 flex items-center justify-between px-4 h-12">
        <span className="font-display text-xl text-wc-gold tracking-widest">WC26</span>
        {user && (
          <button onClick={()=>setProfileOpen(true)}
            className="flex items-center gap-2 py-1 px-2 rounded-xl hover:bg-white/8 transition-all">
            <span className="text-xl leading-none">{user.avatar}</span>
            <span className="text-white text-xs font-semibold max-w-[100px] truncate">{user.username}</span>
          </button>
        )}
      </div>

      {/* ── Mobile bottom nav ────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-wc-surface/95 backdrop-blur border-t border-white/5 flex">
        {NAV.map(({to,icon:Icon,label})=>(
          <NavLink key={to} to={to} className={mCls} end={to==='/'} style={{flex:1}}>
            <Icon size={19}/><span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Mobile profile bottom sheet ──────────────────────────────── */}
      <AnimatePresence>
        {profileOpen && <ProfileSheet onClose={()=>setProfileOpen(false)}/>}
      </AnimatePresence>

      {/* ── Desktop delete confirm ───────────────────────────────────── */}
      <AnimatePresence>
        {showDelete && <DeleteConfirmModal onConfirm={handleDelete} onCancel={()=>setShowDelete(false)} busy={delBusy}/>}
      </AnimatePresence>
    </>
  );
}
