import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Task, Goal, Habit } from '../utils/types';

// ─── Collection names ─────────────────────────────────────────────
const TASKS = 'tasks';
const GOALS = 'goals';
const HABITS = 'habits';

// ─── Tasks ───────────────────────────────────────────────────────
export const subscribeToTasks = (
  userId: string,
  onData: (tasks: Task[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  const q = query(
    collection(db, TASKS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      const tasks = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Task));
      onData(tasks);
    },
    onError
  );
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, TASKS), task);
  return ref.id;
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<void> => {
  await updateDoc(doc(db, TASKS, taskId), updates as Record<string, unknown>);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await deleteDoc(doc(db, TASKS, taskId));
};

// ─── Goals ───────────────────────────────────────────────────────
export const subscribeToGoals = (
  userId: string,
  onData: (goals: Goal[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  const q = query(
    collection(db, GOALS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  return onSnapshot(
    q,
    (snap) => {
      const goals = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Goal));
      onData(goals);
    },
    onError
  );
};

export const createGoal = async (goal: Omit<Goal, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, GOALS), goal);
  return ref.id;
};

export const updateGoal = async (
  goalId: string,
  updates: Partial<Goal>
): Promise<void> => {
  await updateDoc(doc(db, GOALS, goalId), updates as Record<string, unknown>);
};

export const deleteGoal = async (goalId: string): Promise<void> => {
  await deleteDoc(doc(db, GOALS, goalId));
};

// ─── Habits ──────────────────────────────────────────────────────
export const subscribeToHabits = (
  userId: string,
  onData: (habits: Habit[]) => void,
  onError?: (err: Error) => void
): Unsubscribe => {
  const q = query(
    collection(db, HABITS),
    where('userId', '==', userId),
    orderBy('createdAt', 'asc')
  );
  return onSnapshot(
    q,
    (snap) => {
      const habits = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Habit));
      onData(habits);
    },
    onError
  );
};

export const createHabit = async (habit: Omit<Habit, 'id'>): Promise<string> => {
  const ref = await addDoc(collection(db, HABITS), habit);
  return ref.id;
};

export const updateHabit = async (
  habitId: string,
  updates: Partial<Habit>
): Promise<void> => {
  await updateDoc(doc(db, HABITS, habitId), updates as Record<string, unknown>);
};

export const deleteHabit = async (habitId: string): Promise<void> => {
  await deleteDoc(doc(db, HABITS, habitId));
};
