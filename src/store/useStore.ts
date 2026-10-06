import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task { id: string; title: string; time: string; done: boolean }
export interface Habit { id: string; name: string; good: boolean; days: string[] }
export interface Trade { id: string; date: string; pair: string; pnl: number; rr: number }
export interface Item { id: string; text: string; done: boolean }
export interface Msg { role: 'user' | 'ai'; text: string }

export const uid = () => Math.random().toString(36).slice(2, 9);
export const dayStr = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() - offset); return d.toISOString().slice(0, 10); };
export const today = () => dayStr(0);

interface State {
  theme: 'dark' | 'light'; tasks: Task[]; habits: Habit[]; trades: Trade[];
  lists: Record<string, Item[]>; chat: Msg[]; water: number;
  set: (p: Partial<State>) => void;
}

const seedTasks = (): Task[] => [
  ['05:30', 'Wake up & pray'], ['06:00', 'Bible reading'], ['07:00', 'Gym workout'],
  ['09:00', 'Pre-market analysis'], ['10:00', 'Trading session'], ['14:00', 'Learning block'],
  ['20:00', 'Evening journal'], ['22:00', 'Sleep']
].map(([time, title]) => ({ id: uid(), time, title, done: false }));

export const STORE_KEY = 'trader-life-ai';
export const useStore = create<State>()(persist((set) => ({
  theme: 'dark', water: 0, trades: [], chat: [], tasks: seedTasks(),
  habits: [{ id: uid(), name: 'Follow trading plan', good: true, days: [] }, { id: uid(), name: 'Revenge trading', good: false, days: [] }],
  lists: { bible: [], gym: [], learning: [], goals: [], journal: [] },
  set: (p) => set(p)
}), { name: STORE_KEY }));
