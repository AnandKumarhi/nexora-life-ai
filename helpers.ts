import { useEffect, useState, useCallback } from 'react';
import { Task } from '../utils/types';
import { uid, nowISO } from '../utils/helpers';
import {
  subscribeToTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/dbService';
import { saveLocal, loadLocal } from '../services/localStorageService';
import { useToast } from '../contexts/ToastContext';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Subscribe to Firestore; fall back to localStorage on error
  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    const unsub = subscribeToTasks(
      userId,
      (data) => {
        setTasks(data);
        saveLocal(userId, 'tasks', data);
        setLoading(false);
      },
      () => {
        // Offline fallback
        setTasks(loadLocal<Task>(userId, 'tasks'));
        setLoading(false);
      }
    );
    return unsub;
  }, [userId]);

  const addTask = useCallback(
    async (fields: Pick<Task, 'title' | 'category' | 'priority' | 'dueDate'>) => {
      if (!userId) return;
      const newTask: Omit<Task, 'id'> = {
        ...fields,
        userId,
        done: false,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      };
      try {
        await createTask(newTask);
        toast('Task added!');
      } catch {
        // Optimistic local update
        const local = { ...newTask, id: uid() };
        setTasks((t) => [local, ...t]);
        saveLocal(userId, 'tasks', [local, ...tasks]);
        toast('Saved offline', 'info');
      }
    },
    [userId, tasks, toast]
  );

  const editTask = useCallback(
    async (taskId: string, fields: Partial<Task>) => {
      if (!userId) return;
      try {
        await updateTask(taskId, { ...fields, updatedAt: nowISO() });
        toast('Task updated!');
      } catch {
        setTasks((t) =>
          t.map((x) => (x.id === taskId ? { ...x, ...fields, updatedAt: nowISO() } : x))
        );
        toast('Saved offline', 'info');
      }
    },
    [userId, toast]
  );

  const toggleTask = useCallback(
    async (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      await editTask(taskId, { done: !task.done });
    },
    [tasks, editTask]
  );

  const removeTask = useCallback(
    async (taskId: string) => {
      if (!userId) return;
      try {
        await deleteTask(taskId);
        toast('Task deleted', 'info');
      } catch {
        setTasks((t) => t.filter((x) => x.id !== taskId));
        toast('Removed offline', 'info');
      }
    },
    [userId, toast]
  );

  return { tasks, loading, addTask, editTask, toggleTask, removeTask };
};
