import { useEffect, useRef, useState } from 'react';
import { STORE_KEY, useStore } from '../store/useStore';

export default function Settings() {
  const { theme, set } = useStore();
  const [ev, setEv] = useState<any>(null);
  const file = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const h = (e: Event) => { e.preventDefault(); setEv(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);
  const exportData = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([localStorage.getItem(STORE_KEY) || '{}'], { type: 'application/json' }));
    a.download = 'trader-life-ai-backup.json'; a.click();
  };
  const importData = async (f?: File) => {
    if (!f) return;
    const raw = await f.text();
    try { if (!JSON.parse(raw).state) throw new Error(); localStorage.setItem(STORE_KEY, raw); location.reload(); } catch { alert('Invalid backup file.'); }
  };
  return (
    <>
      <h1>Settings</h1>
      <div className="card row between"><span>Theme</span><button className="btn" onClick={() => set({ theme: theme === 'dark' ? 'light' : 'dark' })}>{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</button></div>
      <div className="card row between"><span>Reminders</span><button className="btn" onClick={() => typeof Notification !== 'undefined' && Notification.requestPermission().then((p) => alert(`Notifications ${p}`))}>Enable notifications</button></div>
      <div className="card row between"><span>Install app</span><button className="btn" disabled={!ev} onClick={() => ev?.prompt()}>{ev ? 'Install' : 'Not available'}</button></div>
      <div className="card row between"><span>Backup</span><span className="row"><button className="btn" onClick={exportData}>Export</button><button className="btn" onClick={() => file.current?.click()}>Import</button></span>
        <input ref={file} type="file" accept="application/json" hidden onChange={(e) => importData(e.target.files?.[0])} /></div>
      <div className="card row between"><span>Reset all data</span><button className="btn danger" onClick={() => { if (confirm('Delete all data?')) { localStorage.removeItem(STORE_KEY); location.reload(); } }}>Reset</button></div>
      <div className="card"><strong>Trader Life AI</strong><p className="muted">Discipline Creates Profits · v1.0</p></div>
    </>
  );
}
