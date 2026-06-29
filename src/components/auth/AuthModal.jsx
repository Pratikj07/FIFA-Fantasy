import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { AuthCard } from './AuthScreen.jsx';

/**
 * Shared modal shown when a logged-out visitor tries to do something that
 * requires an account — saving a prediction, saving a bracket, etc.
 * Browsing/interacting with the underlying UI stays completely free; this
 * only appears at the moment of the actual save action.
 */
export default function AuthModal({ open, onClose, message, onAuthenticated }) {
  const { user } = useAuth();

  // Auto-close (and let the caller auto-retry the original action) the
  // instant login/register succeeds, so the visitor doesn't have to
  // close the modal and click "save" a second time.
  useEffect(() => {
    if (open && user) {
      onAuthenticated?.();
      onClose?.();
    }
  }, [user?.id, open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" onClick={onClose}/>
          <motion.div initial={{opacity:0,y:30,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:0.97}}
            transition={{type:'spring',damping:28,stiffness:320}}
            className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 overflow-y-auto pointer-events-none">
            <div className="relative pointer-events-auto w-full max-w-md my-auto" onClick={e=>e.stopPropagation()}>
              <button onClick={onClose}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-wc-surface border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                <X size={15}/>
              </button>
              {message && (
                <p className="text-center text-white/50 text-sm mb-3">{message}</p>
              )}
              <AuthCard compact title="WC26" subtitle="JOIN IN"/>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
