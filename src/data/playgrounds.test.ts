import { describe, expect, it } from 'vitest';
import { PlaygroundSchema } from '../types';
import { playgrounds } from './playgrounds';

describe('playground dataset', () => {
  it('contains the planned curated coverage', () => {
    expect(playgrounds.length).toBeGreaterThanOrEqual(100);
  });

  it('validates every record and keeps identifiers unique', () => {
    playgrounds.forEach((item) => expect(() => PlaygroundSchema.parse(item)).not.toThrow());
    expect(new Set(playgrounds.map((item) => item.id)).size).toBe(playgrounds.length);
    expect(
      new Set(
        playgrounds.map(
          (item) => `${item.coordinates.lat},${item.coordinates.lng}`,
        ),
      ).size,
    ).toBe(playgrounds.length);
  });

  it('provides field evidence and place-detail Google Maps links', () => {
    playgrounds.forEach((item) => {
      if (item.verificationMethod === 'manual-source-review') {
        expect(item.evidence.some((evidence) => evidence.fields.includes('facilities'))).toBe(true);
      } else {
        expect(item.status).toBe('check-before-visit');
        expect(item.evidence.some((evidence) => evidence.fields.includes('coordinates'))).toBe(true);
        Object.entries(item.facilities).forEach(([key, value]) => {
          if (value === 'yes') {
            expect(item.evidence[0].fields.some((field) => field === 'facilities' || field === `facilities.${key}`)).toBe(true);
          }
        });
      }
      const url = new URL(item.googleMapsUrl);
      const query = url.searchParams.get('query') ?? '';
      expect(url.searchParams.get('api')).toBe('1');
      expect(query).toContain(item.name);
      expect(query).toContain(item.address);
      expect(query).not.toBe(`${item.coordinates.lat},${item.coordinates.lng}`);
      expect(url.searchParams.get('utm_source')).toBe('playplan_perth');
    });
  });

  it('labels AI-assisted records and keeps confirmation evidence-gated', () => {
    const assisted = playgrounds.filter(
      (item) => item.verificationMethod === 'ai-assisted-source-review',
    );
    expect(assisted).toHaveLength(61);
    assisted.forEach((item) => {
      expect(item.evidence).toHaveLength(2);
      expect(item.evidence.some((evidence) => evidence.sourceUrl.includes('openstreetmap.org'))).toBe(true);
      const confirmed = Object.entries(item.facilities).filter(([, value]) => value === 'yes');
      confirmed.forEach(([key]) => {
        expect(item.evidence[0].fields.some((field) => field === 'facilities' || field === `facilities.${key}`)).toBe(true);
      });
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
