import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { LiveScoresProvider } from './context/LiveScoresContext.jsx';
import useStore from './store/useStore.js';
import Navbar from './components/layout/Navbar.jsx';
import Home from './pages/Home.jsx';
import LiveScores from './pages/LiveScores.jsx';
import Predictions from './pages/Predictions.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Bracket from './pages/Bracket.jsx';

function Inner() {
  const { user, loading } = useAuth();
  const { setUserId, loadPredictions, loadBracket, tickLiveMinute } = useStore();

  // Sync user ID + load their data when they log in
  useEffect(() => {
    if (!user) return;
    setUserId(user.id);
    loadPredictions(user.id);
    loadBracket(user.id);
  }, [user?.id]);

  useEffect(() => {
    const id = setInterval(tickLiveMinute, 45_000);
    return () => clearInterval(id);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-wc-bg flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-5xl animate-pulse">🏆</div>
        <p className="text-white/40 font-display tracking-widest text-xl">WC26</p>
      </div>
    </div>
  );

  // The whole app is browsable without an account. Predictions and Bracket
  // render fully for guests too — every page/spinner/picker is interactive.
  // Login is only required at the moment of an actual save action (see the
  // AuthModal triggered inside PredictCard's submit() and Bracket's
  // handleSave()). Leaderboard renders for everyone but blurs personal
  // names/points until the visitor signs in (see LeaderboardTable).
  return (
    <LiveScoresProvider>
      <div className="min-h-screen bg-wc-bg font-body text-white">
        <Navbar />
        <main className="pt-12 lg:pt-0 pb-24 lg:pb-0 lg:pl-64">
          <div className="max-w-5xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/scores"      element={<LiveScores />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/bracket"     element={<Bracket />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="*"            element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </LiveScoresProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
