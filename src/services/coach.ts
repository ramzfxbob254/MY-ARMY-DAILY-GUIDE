export function reply(q: string, done: number, total: number): string {
  const t = q.toLowerCase();
  const has = (...w: string[]) => w.some((x) => t.includes(x));
  if (has('plan my', 'schedule', 'day'))
    return 'Suggested day:\n5:30 Wake, pray\n6:00 Bible\n7:00 Gym\n9:00 Pre-market analysis\n10:00 Trading session\n14:00 Learning\n20:00 Journal & review\n22:00 Sleep';
  if (has('trade', 'trading', 'risk'))
    return 'Trading review: Did you follow your checklist? Risk max 1% per trade, log every trade with its R-multiple, and write down one mistake and one lesson. Process first, profit follows.';
  if (has('motivat', 'tired', 'discipline'))
    return 'Discipline Creates Profits. You do not need to feel ready. Do the next small right thing, then the next one.';
  if (has('bible', 'verse', 'pray'))
    return 'Proverbs 21:5 — The plans of the diligent lead surely to abundance. Read one chapter, write one takeaway, pray over your day.';
  if (has('workout', 'gym', 'exercise'))
    return 'Workout: Squats 4x8, Bench press 4x8, Rows 3x10, Plank 3x45s. Rest 90s between sets. Drink water.';
  if (has('study', 'learn'))
    return 'Study plan: 3 blocks of 45 minutes, 10 minute breaks. Block 1 read, block 2 practice, block 3 flash cards and recap.';
  if (has('productiv', 'analy'))
    return `You completed ${done} of ${total} tasks today (${total ? Math.round((done / total) * 100) : 0}%). ${done < total ? 'Pick the most important unfinished task and do it now.' : 'Excellent. Review and rest.'}`;
  if (has('goal', 'week'))
    return 'Weekly goals: 1) Journal every trade 2) Gym 4 times 3) Bible reading daily 4) Finish one learning module 5) Zero revenge trades.';
  return 'I can plan your day, review trading, motivate you, give a Bible verse, a workout, a study plan or weekly goals. Try a suggestion below.';
}
