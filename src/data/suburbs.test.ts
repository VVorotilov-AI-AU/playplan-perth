import { describe, expect, it } from 'vitest';
import { suburbs } from './suburbs';

describe('Perth suburb catalogue', () => {
  it('covers the metropolitan region with unique, valid locations', () => {
    expect(suburbs.length).toBeGreaterThan(350);
    expect(new Set(suburbs.map((item) => item.name)).size).toBe(suburbs.length);
    expect(suburbs.every((item) => item.coordinates.lat >= -33 && item.coordinates.lat <= -31)).toBe(true);
    expect(suburbs.every((item) => item.coordinates.lng >= 115 && item.coordinates.lng <= 117)).toBe(true);
  });

  it('includes northern, southern, eastern and central suburbs', () => {
    expect(suburbs.map((item) => item.name)).toEqual(
      expect.arrayContaining(['Two Rocks', 'Singleton', 'Mundaring', 'Perth', 'Subiaco']),
    );
  });
});
