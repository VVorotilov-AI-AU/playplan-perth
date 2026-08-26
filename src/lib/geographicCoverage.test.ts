import { describe, expect, it } from 'vitest';
import { playgrounds } from '../data/playgrounds';
import type { FacilityKey, SearchCriteria } from '../types';
import { recommendPlaygrounds } from './recommend';

function search(
  originLabel: string,
  lat: number,
  lng: number,
  essentials: FacilityKey[],
  radiusKm = 15,
) {
  const criteria: SearchCriteria = {
    mode: 'today',
    ages: [4, 9],
    origin: { lat, lng },
    originLabel,
    travelLimitMode: 'distance',
    radiusKm,
    maxDriveMinutes: 30,
    essentials,
    preferences: ['climbing', 'swings'],
  };
  return recommendPlaygrounds(playgrounds, criteria);
}

describe('north-to-south geographic regression scenarios', () => {
  it('finds a strict verified local option in Cottesloe', () => {
    const results = search('Cottesloe', -31.998, 115.761, ['shade', 'toilets', 'bbq', 'fenced']);
    expect(results[0]?.playground.id).toBe('cottesloe-civic-centre-playground');
    expect(results[0]?.distanceKm).toBeLessThan(3);
  });

  it('finds verified accessible options around Alkimos', () => {
    const results = search('Alkimos', -31.63, 115.69, ['toilets', 'accessibleEquipment'], 10);
    expect(results.map((item) => item.playground.id)).toEqual(
      expect.arrayContaining(['halesworth-park-playground', 'leatherback-park-playground']),
    );
    expect(results.every((item) => item.distanceKm < 10)).toBe(true);
  });

  it('finds a verified northern option from Joondalup without a cross-city result', () => {
    const results = search('Joondalup', -31.745, 115.766, ['bbq', 'toilets', 'accessibleEquipment'], 15);
    expect(results.some((item) => item.playground.id === 'duncraig-adventure-hub')).toBe(true);
    expect(results.every((item) => item.distanceKm <= 15)).toBe(true);
  });

  it('finds verified destinations around Rockingham', () => {
    const results = search('Rockingham', -32.277, 115.73, ['bbq', 'toilets', 'accessibleEquipment'], 15);
    expect(results.map((item) => item.playground.id)).toEqual(
      expect.arrayContaining(['churchill-park-play-space', 'fantasy-park']),
    );
    expect(results.every((item) => item.distanceKm <= 15)).toBe(true);
  });
});
