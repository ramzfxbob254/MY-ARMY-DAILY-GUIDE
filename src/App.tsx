import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { FiCalendar, FiCheckCircle, FiHome, FiSettings, FiTrendingUp, FiZap } from 'react-icons/fi';
import { useStore } from './store/useStore';
import AICoach from './components/AICoach';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import Trading from './pages/Trading';
import Habits from './pages/Habits';
import ListPage from './pages/ListPage';
import Settings from './pages/Settings';

const NAV = [['/', FiHome, 'Home'], ['/planner', FiCalendar, 'Plan'], ['/trading', FiTrendingUp, 'Trading'], ['/habits', FiCheckCircle, 'Habits'], ['/settings', FiSettings, 'Settings']] as const;

export default function App() {
  const theme = useStore((s) => s.theme);
  const [ai, setAi] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/bible" element={<ListPage k="bible" title="Bible" hint="Reading, prayer, favorite verse..." />} />
          <Route path="/gym" element={<ListPage k="gym" title="Gym" hint="Exercise, sets x reps..." />} />
          <Route path="/learning" element={<ListPage k="learning" title="Learning" hint="Course, book, video..." />} />
          <Route path="/goals" element={<ListPage k="goals" title="Goals" hint="Daily, weekly, monthly goal..." />} />
          <Route path="/journal" element={<ListPage k="journal" title="Journal" hint="Gratitude, lesson, tomorrow plan..." />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <button className="fab" onClick={() => setAi(true)} aria-label="Open AI Coach"><FiZap /></button>
      <nav>{NAV.map(([to, Icon, label]) => <NavLink key={to} to={to} end={to === '/'}><Icon /><span>{label}</span></NavLink>)}</nav>
      <AICoach open={ai} onClose={() => setAi(false)} />
    </div>
  );
}
