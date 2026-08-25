import { describe, expect, it } from 'vitest';
import { PlaygroundSchema } from '../types';
import { playgrounds } from './playgrounds';

describe('playground dataset', () => {
  it('contains the planned curated coverage', () => {
    expect(playgrounds.length).toBeGreaterThanOrEqual(30);
    expect(playgrounds.length).toBeLessThanOrEqual(40);
  });

  it('validates every record and keeps identifiers unique', () => {
    playgrounds.forEach((item) => expect(() => PlaygroundSchema.parse(item)).not.toThrow());
    expect(new Set(playgrounds.map((item) => item.id)).size).toBe(playgrounds.length);
  });

  it('provides field evidence and place-detail Google Maps links', () => {
    playgrounds.forEach((item) => {
      expect(item.evidence.some((evidence) => evidence.fields.includes('facilities'))).toBe(true);
      const url = new URL(item.googleMapsUrl);
      const query = url.searchParams.get('query') ?? '';
      expect(url.searchParams.get('api')).toBe('1');
      expect(query).toContain(item.name);
      expect(query).toContain(item.address);
      expect(query).not.toBe(`${item.coordinates.lat},${item.coordinates.lng}`);
      expect(url.searchParams.get('utm_source')).toBe('playplan_perth');
    });
  });

  it('covers the inner city, coast, north, south, east and hills', () => {
    const councils = new Set(playgrounds.map((item) => item.council));
    expect(councils.size).toBeGreaterThanOrEqual(10);
    expect(playgrounds.some((item) => item.suburb === 'Scarborough')).toBe(true);
    expect(playgrounds.some((item) => item.suburb === 'Kalamunda')).toBe(true);
    expect(playgrounds.some((item) => item.coordinates.lat < -32.2)).toBe(true);
  });
});
