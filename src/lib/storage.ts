import type { SearchCriteria, VisitMemory } from '../types';

const MEMORY_KEY = 'playplan:visits:v1';
const FAVORITES_KEY = 'playplan:favorites:v1';
const CRITERIA_KEY = 'playplan:criteria:v1';

function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

export function loadMemories(): VisitMemory[] {
  const value = safeRead<unknown>(MEMORY_KEY, []);
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is VisitMemory =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as VisitMemory).playgroundId === 'string' &&
      Array.isArray((item as VisitMemory).tags),
  );
}

export function saveMemories(memories: VisitMemory[]): void {
  window.localStorage.setItem(MEMORY_KEY, JSON.stringify(memories));
}

export function loadFavorites(): string[] {
  const value = safeRead<unknown>(FAVORITES_KEY, []);
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

export function saveFavorites(ids: string[]): void {
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
}

export function loadCriteria(): Partial<SearchCriteria> {
  return safeRead<Partial<SearchCriteria>>(CRITERIA_KEY, {});
}

export function saveCriteria(criteria: SearchCriteria): void {
  const safeCriteria = {
    ...criteria,
    origin: undefined,
    originLabel: criteria.originLabel.startsWith('Current location')
      ? ''
      : criteria.originLabel,
  };
  window.localStorage.setItem(CRITERIA_KEY, JSON.stringify(safeCriteria));
}
