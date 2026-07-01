import { v4 as uuidv4 } from 'uuid';

export const uid = (): string => uuidv4();

export const formatDate = (date: Date = new Date()): string =>
  date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export const formatDateShort = (date: Date = new Date()): string =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const todayISO = (): string =>
  new Date().toISOString().split('T')[0];

export const nowISO = (): string => new Date().toISOString();

export const getGreeting = (): string => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const getDaysUntil = (dateStr: string): number => {
  if (!dateStr) return 0;
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isToday = (isoString: string): boolean => {
  if (!isoString) return false;
  return isoString.startsWith(todayISO());
};

export const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

export const getPriorityColor = (priority: string): string => {
  const map: Record<string, string> = {
    High: '#EF4444',
    Medium: '#F59E0B',
    Low: '#22C55E',
  };
  return map[priority] ?? '#8B8B9E';
};

export const getGoalColor = (index: number): string => {
  const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#22C55E', '#F59E0B', '#06B6D4'];
  return colors[index % colors.length];
};

export const MOTIVATIONAL_QUOTES = [
  'Small steps every day lead to massive results over time.',
  'Your future self is watching you right now. Make them proud.',
  'Discipline is choosing between what you want now and what you want most.',
  'The best time to start was yesterday. The second best time is now.',
  'Consistency compounds. Show up, even on the hard days.',
  'Progress, not perfection. Every rep counts.',
  'You are one decision away from a completely different life.',
  'Build the life you want, one habit at a time.',
];

export const getRandomQuote = (): string =>
  MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];

export const DEFAULT_HABITS = [
  { name: 'Hydrate', icon: '💧', target: 8, unit: 'glasses', color: '#3B82F6' },
  { name: 'Exercise', icon: '🏋️', target: 1, unit: 'session', color: '#22C55E' },
  { name: 'Reading', icon: '📖', target: 30, unit: 'mins', color: '#F59E0B' },
  { name: 'Meditate', icon: '🧘', target: 10, unit: 'mins', color: '#8B5CF6' },
  { name: 'Sleep', icon: '😴', target: 8, unit: 'hrs', color: '#EC4899' },
];
