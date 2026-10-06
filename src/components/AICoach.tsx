import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMic, FiSend, FiX } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import { reply } from '../services/coach';

const SUGGEST = ['Plan my day', 'Review my trading', 'Motivate me', 'Bible verse today', 'Workout suggestion', 'Create study plan', 'Analyze my productivity', 'Generate weekly goals'];

export default function AICoach({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { chat, tasks, set } = useStore();
  const [text, setText] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat, open]);

  const send = (q: string) => {
    if (!q.trim()) return;
    const done = tasks.filter((t) => t.done).length;
    set({ chat: [...chat, { role: 'user', text: q }, { role: 'ai', text: reply(q, done, tasks.length) }] });
    setText('');
  };
  const voice = () => {
    const W = window as unknown as Record<string, any>;
    const SR = W.SpeechRecognition || W.webkitSpeechRecognition;
    if (!SR) { alert('Voice input is not supported in this browser.'); return; }
    const r = new SR();
    r.onresult = (e: any) => send(e.results[0][0].transcript);
    r.start();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="sheet glass" initial={{ y: 400 }} animate={{ y: 0 }} exit={{ y: 400 }} transition={{ type: 'spring', damping: 26 }}>
            <header><h3>AI Coach</h3><button className="icon" onClick={onClose} aria-label="Close"><FiX /></button></header>
            <div className="chat">
              {chat.length === 0 && <p className="muted">Ask me anything about your day, trading, gym or Bible study.</p>}
              {chat.map((m, i) => <div key={i} className={`bubble ${m.role}`}>{m.text}</div>)}
              <div ref={end} />
            </div>
            <div className="chips">{SUGGEST.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
            <form className="row" onSubmit={(e) => { e.preventDefault(); send(text); }}>
              <button type="button" className="icon" onClick={voice} aria-label="Voice"><FiMic /></button>
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask your coach..." />
              <button className="icon primary" aria-label="Send"><FiSend /></button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
