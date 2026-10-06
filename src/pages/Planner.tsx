import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { uid, useStore } from '../store/useStore';

export default function Planner() {
  const { tasks, set } = useStore();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('12:00');
  const add = () => { if (title.trim()) { set({ tasks: [...tasks, { id: uid(), title, time, done: false }] }); setTitle(''); } };
  return (
    <>
      <h1>Daily Planner</h1>
      <p className="muted">5:30 AM to 10:00 PM · drag to reorder</p>
      <div className="card row">
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task" onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button className="btn" onClick={add}>Add</button>
      </div>
      <Reorder.Group axis="y" values={tasks} onReorder={(t) => set({ tasks: t })} className="list">
        {tasks.map((t) => (
          <Reorder.Item key={t.id} value={t} className={`card row between ${t.done ? 'done' : ''}`}>
            <label className="row"><input type="checkbox" checked={t.done} onChange={() => set({ tasks: tasks.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)) })} />
              <span><strong>{t.time}</strong> {t.title}</span></label>
            <span className="row">
              <button className="icon" aria-label="Edit" onClick={() => { const n = prompt('Edit task', t.title); if (n) set({ tasks: tasks.map((x) => (x.id === t.id ? { ...x, title: n } : x)) }); }}><FiEdit2 /></button>
              <button className="icon" aria-label="Delete" onClick={() => set({ tasks: tasks.filter((x) => x.id !== t.id) })}><FiTrash2 /></button>
            </span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}
