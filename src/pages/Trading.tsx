import { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { uid, today, useStore } from '../store/useStore';

export default function Trading() {
  const { trades, set } = useStore();
  const [bal, setBal] = useState('10000'), [risk, setRisk] = useState('1'), [entry, setEntry] = useState(''), [stop, setStop] = useState('');
  const [pair, setPair] = useState(''), [pnl, setPnl] = useState(''), [rr, setRr] = useState('');
  const dist = Math.abs(Number(entry) - Number(stop));
  const riskAmt = (Number(bal) * Number(risk)) / 100;
  const size = dist > 0 ? riskAmt / dist : 0;
  const wins = trades.filter((t) => t.pnl > 0).length;
  const winRate = trades.length ? Math.round((wins / trades.length) * 100) : 0;
  const avgRR = trades.length ? (trades.reduce((a, t) => a + t.rr, 0) / trades.length).toFixed(2) : '0.00';
  const total = trades.reduce((a, t) => a + t.pnl, 0);
  const add = () => {
    if (!pair.trim() || pnl === '') return;
    set({ trades: [...trades, { id: uid(), date: today(), pair, pnl: Number(pnl), rr: Number(rr) || 0 }] });
    setPair(''); setPnl(''); setRr('');
  };
  return (
    <>
      <h1>Trading</h1>
      <div className="grid">
        <div className="card"><p className="muted">Win rate</p><h2>{winRate}%</h2></div>
        <div className="card"><p className="muted">Loss rate</p><h2>{trades.length ? 100 - winRate : 0}%</h2></div>
        <div className="card"><p className="muted">Average RR</p><h2>{avgRR}</h2></div>
        <div className="card"><p className="muted">Net P/L</p><h2 className={total >= 0 ? 'good' : 'bad'}>{total.toFixed(2)}</h2></div>
      </div>
      <div className="card">
        <h3>Risk calculator</h3>
        <div className="row wrap">
          <input type="number" value={bal} onChange={(e) => setBal(e.target.value)} placeholder="Balance" />
          <input type="number" value={risk} onChange={(e) => setRisk(e.target.value)} placeholder="Risk %" />
          <input type="number" value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="Entry" />
          <input type="number" value={stop} onChange={(e) => setStop(e.target.value)} placeholder="Stop loss" />
        </div>
        <p>Risk amount: <strong>{riskAmt.toFixed(2)}</strong> · Position size: <strong>{size.toFixed(4)}</strong> units</p>
      </div>
      <div className="card">
        <h3>Log a trade</h3>
        <div className="row wrap">
          <input value={pair} onChange={(e) => setPair(e.target.value)} placeholder="Pair" />
          <input type="number" value={pnl} onChange={(e) => setPnl(e.target.value)} placeholder="Profit / loss" />
          <input type="number" value={rr} onChange={(e) => setRr(e.target.value)} placeholder="RR" />
          <button className="btn" onClick={add}>Save</button>
        </div>
      </div>
      <div className="card">
        <h3>Performance</h3>
        {trades.length === 0 ? <p className="muted">Log your first trade to see your chart.</p> : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trades.map((t, i) => ({ n: i + 1, pnl: t.pnl }))}><XAxis dataKey="n" /><Tooltip /><Bar dataKey="pnl" fill="#0EA5E9" radius={4} /></BarChart>
          </ResponsiveContainer>
        )}
      </div>
      {[...trades].reverse().map((t) => (
        <div key={t.id} className="card row between">
          <span>{t.date} · {t.pair}</span><span className={t.pnl >= 0 ? 'good' : 'bad'}>{t.pnl} ({t.rr}R)</span>
          <button className="icon" aria-label="Delete" onClick={() => set({ trades: trades.filter((x) => x.id !== t.id) })}>✕</button>
        </div>
      ))}
    </>
  );
}
