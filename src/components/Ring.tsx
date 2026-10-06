import { motion } from 'framer-motion';

export default function Ring({ pct, size = 130 }: { pct: number; size?: number }) {
  const r = size / 2 - 10, c = 2 * Math.PI * r, m = size / 2;
  return (
    <svg width={size} height={size}>
      <circle cx={m} cy={m} r={r} className="ring-bg" />
      <motion.circle cx={m} cy={m} r={r} className="ring-fg" strokeDasharray={c}
        initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - pct / 100) }}
        transition={{ duration: 0.9 }} transform={`rotate(-90 ${m} ${m})`} />
      <text x="50%" y="50%" textAnchor="middle" dy=".35em" className="ring-t">{pct}%</text>
    </svg>
  );
}
