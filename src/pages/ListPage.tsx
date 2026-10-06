import { useState } from 'react';
import { Item, uid, useStore } from '../store/useStore';

export default function ListPage({ k, title, hint }: { k: string; title: string; hint: string }) {
  const { lists, set } = useStore();
  const items = lists[k] || [];
  const [text, setText] = useState('');
  const save = (n: Item[]) => set({ lists: { ...lists, [k]: n } });
  const add = () => { if (text.trim()) { save([...items, { id: uid(), text, done: false }]); setText(''); } };
  return (
    <>
      <h1>{title}</h1>
      <p className="muted">{items.filter((i) => i.done).length} of {items.length} completed</p>
      <div className="card row">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={hint} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button className="btn" onClick={add}>Add</button>
      </div>
      {items.length === 0 && <p className="muted">Nothing here yet. Add your first entry above.</p>}
      {items.map((i) => (
        <div key={i.id} className={`card row between ${i.done ? 'done' : ''}`}>
          <label className="row"><input type="checkbox" checked={i.done} onChange={() => save(items.map((x) => (x.id === i.id ? { ...x, done: !x.done } : x)))} />{i.text}</label>
          <button className="icon" aria-label="Delete" onClick={() => save(items.filter((x) => x.id !== i.id))}>✕</button>
        </div>
      ))}
    </>
  );
}
