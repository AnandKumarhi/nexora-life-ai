import { useEffect, useState, useCallback } from 'react';
import { Goal, Milestone } from '../utils/types';
import { uid, nowISO } from '../utils/helpers';
import {
  subscribeToGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../services/dbService';
import { saveLocal, loadLocal } from '../services/localStorageService';
import { useToast } from '../contexts/ToastContext';

export const useGoals = (userId: string | undefined) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const unsub = subscribeToGoals(
      userId,
      (data) => {
        setGoals(data);
        saveLocal(userId, 'goals', data);
        setLoading(false);
      },
      () => {
        setGoals(loadLocal<Goal>(userId, 'goals'));
        setLoading(false);
      }
    );
    return unsub;
  }, [userId]);

  const addGoal = useCallback(
    async (fields: Pick<Goal, 'title' | 'description' | 'deadline'> & { milestoneTexts: string[] }) => {
      if (!userId) return;
      const milestones: Milestone[] = fields.milestoneTexts
        .filter(Boolean)
        .map((text) => ({ id: uid(), text, done: false }));

      const newGoal: Omit<Goal, 'id'> = {
        userId,
        title: fields.title,
        description: fields.description,
        deadline: fields.deadline,
        progress: 0,
        milestones,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      };
      try {
        await createGoal(newGoal);
        toast('Goal created! 🎯');
      } catch {
        const local = { ...newGoal, id: uid() };
        setGoals((g) => [local, ...g]);
        toast('Saved offline', 'info');
      }
    },
    [userId, toast]
  );

  const editGoal = useCallback(
    async (goalId: string, updates: Partial<Goal>) => {
      if (!userId) return;
      try {
        await updateGoal(goalId, { ...updates, updatedAt: nowISO() });
      } catch {
        setGoals((g) =>
          g.map((x) => (x.id === goalId ? { ...x, ...updates, updatedAt: nowISO() } : x))
        );
      }
    },
    [userId]
  );

  const updateProgress = useCallback(
    async (goalId: string, delta: number) => {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;
      const newProgress = Math.min(100, Math.max(0, goal.progress + delta));
      await editGoal(goalId, { progress: newProgress });
    },
    [goals, editGoal]
  );

  const toggleMilestone = useCallback(
    async (goalId: string, milestoneId: string) => {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;
      const milestones = goal.milestones.map((m) =>
        m.id === milestoneId ? { ...m, done: !m.done } : m
      );
      // Auto-advance progress based on milestones
      const donePct =
        milestones.length > 0
          ? Math.round((milestones.filter((m) => m.done).length / milestones.length) * 100)
          : goal.progress;
      await editGoal(goalId, { milestones, progress: donePct });
    },
    [goals, editGoal]
  );

  const removeGoal = useCallback(
    async (goalId: string) => {
      if (!userId) return;
      try {
        await deleteGoal(goalId);
        toast('Goal deleted', 'info');
      } catch {
        setGoals((g) => g.filter((x) => x.id !== goalId));
      }
    },
    [userId, toast]
  );

  return { goals, loading, addGoal, editGoal, updateProgress, toggleMilestone, removeGoal };
};
