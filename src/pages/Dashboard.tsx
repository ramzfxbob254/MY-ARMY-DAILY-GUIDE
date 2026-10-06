import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore, today } from '../store/useStore';
import Ring from '../components/Ring';

export default function Dashboard() {
  const { tasks, water, lists, trades, set } = useStore();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  const h = now.getHours();
  const greet = h < 12 ? 'Good Morning' : h < 18 ? 'Good Afternoon' : 'Good Evening';
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const c = (k: string) => `${(lists[k] || []).filter((i) => i.done).length}/${(lists[k] || []).length}`;
  const cards: [string, string, string][] = [
    ['Workout', c('gym'), '/gym'], ['Bible Reading', c('bible'), '/bible'],
    ['Trading Session', `${trades.filter((t) => t.date === today()).length} trades`, '/trading'],
    ['Learning', c('learning'), '/learning'], ['Goals', c('goals'), '/goals'], ['Mood & Journal', c('journal'), '/journal']
  ];
  return (
    <>
      <p className="muted">{now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} · {now.toLocaleTimeString()}</p>
      <h1>{greet}, Robert</h1>
      <div className="card hero">
        <Ring pct={pct} />
        <div><p className="muted">Today's Focus</p><h2>Discipline Beats Emotion</h2><p>{done} of {tasks.length} tasks done</p><p className="muted">Productivity score {pct}</p></div>
      </div>
      <div className="card row between">
        <div><p className="muted">Water Intake</p><h2>{water} / 8 glasses</h2></div>
        <button className="btn" onClick={() => set({ water: Math.min(water + 1, 8) })}>+ Glass</button>
      </div>
      <div className="grid">{cards.map(([l, v, to]) => <Link key={l} to={to} className="card"><p className="muted">{l}</p><h2>{v}</h2></Link>)}</div>
    </>
  );
}
