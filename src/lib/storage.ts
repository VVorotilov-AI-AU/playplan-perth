import type { Activity, FacilityKey, Mode, SearchCriteria, VisitMemory, VisitTag } from '../types';

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
  const validTags: VisitTag[] = [
    'kids-loved-it', 'too-crowded', 'too-hot', 'equipment-hot',
    'age-mismatch', 'bbq-occupied', 'toddler-friendly', 'good-sightlines',
    'pram-friendly', 'easy-parking', 'parking-difficult', 'toilets-easy',
    'visit-again',
  ];
  return value.filter(
    (item): item is VisitMemory =>
      typeof item === 'object' &&
      item !== null &&
      typeof (item as VisitMemory).playgroundId === 'string' &&
      Array.isArray((item as VisitMemory).tags) &&
      (item as VisitMemory).tags.every((tag) => validTags.includes(tag)),
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
  const value = safeRead<unknown>(CRITERIA_KEY, {});
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {};

  const candidate = value as Record<string, unknown>;
  const validModes: Mode[] = ['today', 'party', 'explore'];
  const validFacilities: FacilityKey[] = [
    'bbq', 'shelter', 'toilets', 'seating', 'fenced',
    'accessibleEquipment', 'openLawn', 'shade',
  ];
  const validActivities: Activity[] = [
    'climbing', 'swings', 'slides', 'nature-play', 'water-play',
    'wheels', 'sports', 'sand-play', 'sensory-play', 'flying-fox',
  ];
  const validRadii = [5, 10, 15, 25, 40];

  const valid =
    (candidate.mode === undefined || validModes.includes(candidate.mode as Mode)) &&
    (candidate.ages === undefined ||
      (Array.isArray(candidate.ages) &&
        candidate.ages.length <= 4 &&
        candidate.ages.every((age) => Number.isInteger(age) && Number(age) >= 1 && Number(age) <= 12))) &&
    (candidate.originLabel === undefined || typeof candidate.originLabel === 'string') &&
    (candidate.radiusKm === undefined || validRadii.includes(candidate.radiusKm as number)) &&
    (candidate.essentials === undefined ||
      (Array.isArray(candidate.essentials) &&
        candidate.essentials.every((item) => validFacilities.includes(item as FacilityKey)))) &&
    (candidate.preferences === undefined ||
      (Array.isArray(candidate.preferences) &&
        candidate.preferences.every((item) => validActivities.includes(item as Activity))));

  if (!valid) {
    window.localStorage.removeItem(CRITERIA_KEY);
    return {};
  }
  return candidate as Partial<SearchCriteria>;
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
