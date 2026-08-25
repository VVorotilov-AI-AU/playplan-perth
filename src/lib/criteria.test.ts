import { describe, expect, it } from 'vitest';
import type { SearchCriteria } from '../types';
import { restoreCriteria } from './criteria';

const defaults: SearchCriteria = {
  mode: 'today',
  ages: [3, 8],
  origin: { lat: -31.949, lng: 115.824 },
  originLabel: 'Subiaco',
  radiusKm: 15,
  essentials: ['shade'],
  preferences: [],
};

const origins = [
  { name: 'Subiaco', coordinates: defaults.origin },
  { name: 'Bayswater', coordinates: { lat: -31.918, lng: 115.913 } },
];

describe('criteria restoration', () => {
  it('restores coordinates that match the persisted suburb label', () => {
    const restored = restoreCriteria(defaults, { originLabel: 'Bayswater' }, 'today', origins);
    expect(restored.originLabel).toBe('Bayswater');
    expect(restored.origin).toEqual(origins[1].coordinates);
  });

  it('falls back to a consistent default for an unknown or GPS label', () => {
    const restored = restoreCriteria(defaults, { originLabel: '' }, 'party', origins);
    expect(restored.originLabel).toBe('Subiaco');
    expect(restored.origin).toEqual(defaults.origin);
    expect(restored.mode).toBe('party');
  });
});
