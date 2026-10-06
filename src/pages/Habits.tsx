import { useState } from 'react';
import { dayStr, today, uid, useStore, Habit } from '../store/useStore';

const streak = (h: Habit) => { let n = 0; while (h.days.includes(dayStr(n))) n++; return n; };

export default function Habits() {
  const { habits, set } = useStore();
  const [name, setName] = useState(''), [good, setGood] = useState(true);
  const toggle = (h: Habit) => set({ habits: habits.map((x) => x.id === h.id ? { ...x, days: x.days.includes(today()) ? x.days.filter((d) => d !== today()) : [...x.days, today()] } : x) });
  const pct = (h: Habit) => Math.round((Array.from({ length: 7 }, (_, i) => h.days.includes(dayStr(i))).filter(Boolean).length / 7) * 100);
  return (
    <>
      <h1>Habits</h1>
      <div className="card row wrap">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="New habit" />
        <select value={good ? 'g' : 'b'} onChange={(e) => setGood(e.target.value === 'g')}><option value="g">Good</option><option value="b">Bad</option></select>
        <button className="btn" onClick={() => { if (name.trim()) { set({ habits: [...habits, { id: uid(), name, good, days: [] }] }); setName(''); } }}>Add</button>
      </div>
      {habits.map((h) => (
        <div key={h.id} className="card">
          <div className="row between">
            <strong className={h.good ? 'good' : 'bad'}>{h.name}</strong>
            <span>🔥 {streak(h)} day streak · {pct(h)}% / 7d</span>
          </div>
          <div className="row between">
            <div className="dots">{Array.from({ length: 7 }, (_, i) => 6 - i).map((i) => <i key={i} className={h.days.includes(dayStr(i)) ? 'on' : ''} />)}</div>
            <span className="row">
              <button className="btn" onClick={() => toggle(h)}>{h.days.includes(today()) ? 'Undo today' : h.good ? 'Done today' : 'Slipped today'}</button>
              <button className="icon" aria-label="Delete" onClick={() => set({ habits: habits.filter((x) => x.id !== h.id) })}>✕</button>
            </span>
          </div>
        </div>
      ))}
    </>
  );
}
