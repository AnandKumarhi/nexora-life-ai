/**
 * LocalStorage service — used as offline fallback when Firebase is unavailable.
 * Keys are namespaced by userId so multiple accounts don't collide.
 */

const key = (userId: string, entity: string) => `nexora_${userId}_${entity}`;

export function saveLocal<T>(userId: string, entity: string, data: T[]): void {
  try {
    localStorage.setItem(key(userId, entity), JSON.stringify(data));
  } catch {
    console.warn('[LocalStorage] Could not save', entity);
  }
}

export function loadLocal<T>(userId: string, entity: string): T[] {
  try {
    const raw = localStorage.getItem(key(userId, entity));
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function clearLocal(userId: string, entity: string): void {
  try {
    localStorage.removeItem(key(userId, entity));
  } catch {}
}

// Chat history (per user)
export function saveChatHistory(userId: string, messages: object[]): void {
  try {
    localStorage.setItem(`nexora_${userId}_chat`, JSON.stringify(messages));
  } catch {}
}

export function loadChatHistory(userId: string): object[] {
  try {
    const raw = localStorage.getItem(`nexora_${userId}_chat`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Daily quote (per day so it doesn't flicker)
export function saveDailyQuote(quote: string): void {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem('nexora_daily_quote', JSON.stringify({ date: today, quote }));
}

export function loadDailyQuote(): string | null {
  try {
    const raw = localStorage.getItem('nexora_daily_quote');
    if (!raw) return null;
    const { date, quote } = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    return date === today ? quote : null;
  } catch {
    return null;
  }
}
