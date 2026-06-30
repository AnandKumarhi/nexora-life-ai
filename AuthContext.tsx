import { useEffect, useState, useCallback } from 'react';
import { Habit, HabitDay } from '../utils/types';
import { uid, nowISO, todayISO, DEFAULT_HABITS } from '../utils/helpers';
import {
  subscribeToHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from '../services/dbService';
import { saveLocal, loadLocal } from '../services/localStorageService';
import { useToast } from '../contexts/ToastContext';

export const useHabits = (userId: string | undefined) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const unsub = subscribeToHabits(
      userId,
      (data) => {
        // Reset todayCount if it's a new day
        const today = todayISO();
        const reset = data.map((h) => {
          const lastUpdated = h.updatedAt?.split('T')[0];
          return lastUpdated !== today ? { ...h, todayCount: 0 } : h;
        });
        setHabits(reset);
        saveLocal(userId, 'habits', reset);
        setLoading(false);
      },
      () => {
        setHabits(loadLocal<Habit>(userId, 'habits'));
        setLoading(false);
      }
    );
    return unsub;
  }, [userId]);

  /** Seed default habits for a brand-new user */
  const seedDefaults = useCallback(async () => {
    if (!userId) return;
    for (const preset of DEFAULT_HABITS) {
      const h: Omit<Habit, 'id'> = {
        userId,
        name: preset.name,
        icon: preset.icon,
        target: preset.target,
        unit: preset.unit,
        color: preset.color,
        todayCount: 0,
        streak: 0,
        history: [],
        createdAt: nowISO(),
        updatedAt: nowISO(),
      };
      await createHabit(h);
    }
  }, [userId]);

  const addHabit = useCallback(
    async (fields: Pick<Habit, 'name' | 'icon' | 'target' | 'unit' | 'color'>) => {
      if (!userId) return;
      const newHabit: Omit<Habit, 'id'> = {
        ...fields,
        userId,
        todayCount: 0,
        streak: 0,
        history: [],
        createdAt: nowISO(),
        updatedAt: nowISO(),
      };
      try {
        await createHabit(newHabit);
        toast('Habit added! 🌱');
      } catch {
        setHabits((h) => [{ ...newHabit, id: uid() }, ...h]);
      }
    },
    [userId, toast]
  );

  const incrementHabit = useCallback(
    async (habitId: string) => {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;
      const newCount = habit.todayCount + 1;
      const today = todayISO();

      // Update history entry for today
      const history = [...habit.history];
      const todayEntry = history.find((d) => d.date === today);
      if (todayEntry) todayEntry.count = newCount;
      else history.push({ date: today, count: newCount });

      // Calculate streak
      const streak = newCount >= habit.target ? habit.streak + (habit.todayCount < habit.target ? 1 : 0) : habit.streak;

      const updates: Partial<Habit> = {
        todayCount: newCount,
        history,
        streak,
        updatedAt: nowISO(),
      };
      try {
        await updateHabit(habitId, updates);
      } catch {
        setHabits((hs) => hs.map((h) => (h.id === habitId ? { ...h, ...updates } : h)));
      }
    },
    [habits]
  );

  const decrementHabit = useCallback(
    async (habitId: string) => {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit || habit.todayCount === 0) return;
      const newCount = habit.todayCount - 1;
      const today = todayISO();
      const history = habit.history.map((d) =>
        d.date === today ? { ...d, count: newCount } : d
      );
      const updates: Partial<Habit> = { todayCount: newCount, history, updatedAt: nowISO() };
      try {
        await updateHabit(habitId, updates);
      } catch {
        setHabits((hs) => hs.map((h) => (h.id === habitId ? { ...h, ...updates } : h)));
      }
    },
    [habits]
  );

  const removeHabit = useCallback(
    async (habitId: string) => {
      try {
        await deleteHabit(habitId);
        toast('Habit removed', 'info');
      } catch {
        setHabits((h) => h.filter((x) => x.id !== habitId));
      }
    },
    [toast]
  );

  return { habits, loading, seedDefaults, addHabit, incrementHabit, decrementHabit, removeHabit };
};
