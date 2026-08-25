import { beforeEach, describe, expect, it } from 'vitest';
import { loadCriteria, loadMemories, saveCriteria, saveMemories } from './storage';

describe('private browser storage', () => {
  beforeEach(() => localStorage.clear());

  it('persists visit notes locally', () => {
    saveMemories([{ playgroundId: 'mueller-park', visitedAt: '2026-08-25T00:00:00Z', tags: ['visit-again'], note: 'Calm morning', mode: 'today', ages: [3] }]);
    expect(loadMemories()[0].note).toBe('Calm morning');
  });

  it('recovers from corrupt data', () => {
    localStorage.setItem('playplan:visits:v1', '{broken');
    expect(loadMemories()).toEqual([]);
  });

  it('never persists a GPS coordinate', () => {
    saveCriteria({ mode: 'today', ages: [4], origin: { lat: -31.9, lng: 115.8 }, originLabel: 'Current location (not saved)', radiusKm: 10, essentials: [], preferences: [] });
    expect(localStorage.getItem('playplan:criteria:v1')).not.toContain('-31.9');
    expect(loadCriteria().originLabel).toBe('');
  });
});

