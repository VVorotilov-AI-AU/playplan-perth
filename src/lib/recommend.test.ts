import { describe, expect, it } from 'vitest';
import { playgrounds } from '../data/playgrounds';
import type { SearchCriteria, VisitMemory, WeatherContext } from '../types';
import { distanceKm, estimateDriveMinutes, recommendPlaygrounds } from './recommend';

const criteria: SearchCriteria = {
  mode: 'today',
  ages: [3, 8],
  origin: { lat: -31.946, lng: 115.831 },
  originLabel: 'Subiaco',
  travelLimitMode: 'distance',
  radiusKm: 15,
  maxDriveMinutes: 30,
  essentials: ['shade', 'toilets', 'bbq'],
  preferences: ['climbing', 'water-play'],
};

describe('recommendation engine', () => {
  it('returns no more than three deterministic results', () => {
    const first = recommendPlaygrounds(playgrounds, criteria);
    const second = recommendPlaygrounds(playgrounds, criteria);
    expect(first.length).toBeGreaterThan(0);
    expect(first.length).toBeLessThanOrEqual(3);
    expect(second.map((item) => item.playground.id)).toEqual(first.map((item) => item.playground.id));
  });

  it('treats unknown as failing an essential hard filter', () => {
    const candidate = playgrounds.find((item) => item.facilities.bbq === 'unknown')!;
    const result = recommendPlaygrounds(
      [candidate],
      { ...criteria, origin: candidate.coordinates, radiusKm: 5, essentials: ['bbq'] },
    );
    expect(result).toEqual([]);
  });

  it('protects a poorly served child in mixed-age scoring', () => {
    const allAges = playgrounds.find((item) => item.ageBands.length === 4)!;
    const youngOnly = {
      ...allAges,
      id: 'young-only-test',
      name: 'Young only test park',
      ageBands: ['1-3'] as Array<'1-3' | '4-6' | '7-9' | '10-12'>,
    };
    const result = recommendPlaygrounds(
      [youngOnly, allAges],
      { ...criteria, origin: allAges.coordinates, radiusKm: 40, essentials: [], preferences: [] },
    );
    expect(result[0].playground.id).toBe(allAges.id);
  });

  it('redistributes weather weight when weather is unavailable', () => {
    const noWeather = recommendPlaygrounds(playgrounds, criteria, [], null);
    expect(noWeather.every((item) => Number.isFinite(item.score))).toBe(true);
  });

  it('uses hot weather and visit memory without overriding hard filters', () => {
    const hot: WeatherContext = {
      temperatureC: 36,
      precipitationProbability: 0,
      condition: 'hot',
      fetchedAt: new Date().toISOString(),
    };
    const base = recommendPlaygrounds(playgrounds, criteria, [], hot);
    const target = base.at(-1)!;
    const memory: VisitMemory = {
      playgroundId: target.playground.id,
      visitedAt: new Date().toISOString(),
      tags: ['kids-loved-it', 'visit-again'],
      mode: 'today',
      ages: [3, 8],
    };
    const adjusted = recommendPlaygrounds(playgrounds, criteria, [memory], hot);
    expect(adjusted.find((item) => item.playground.id === target.playground.id)?.score).toBeGreaterThanOrEqual(target.score);
    expect(adjusted.every((item) => item.playground.facilities.bbq === 'yes')).toBe(true);
  });

  it('uses contextual parent feedback for the relevant family and mode', () => {
    const target = recommendPlaygrounds(playgrounds, { ...criteria, essentials: [] }).at(-1)!;
    const positive: VisitMemory = {
      playgroundId: target.playground.id,
      visitedAt: '2026-08-25T01:00:00Z',
      tags: ['toddler-friendly', 'good-sightlines', 'easy-parking'],
      mode: 'today',
      ages: [2],
      context: 'weekend-morning',
    };
    const toddlerSearch = { ...criteria, ages: [2], essentials: [] };
    const before = recommendPlaygrounds([target.playground], toddlerSearch)[0];
    const after = recommendPlaygrounds([target.playground], toddlerSearch, [positive])[0];
    expect(after.score).toBeGreaterThan(before.score);
  });

  it('penalizes a repeatedly difficult arrival without changing essentials', () => {
    const target = playgrounds.find((item) => item.facilities.bbq === 'yes')!;
    const memory: VisitMemory = {
      playgroundId: target.id,
      visitedAt: '2026-08-25T01:00:00Z',
      tags: ['parking-difficult', 'bbq-occupied'],
      mode: 'party',
      ages: [5],
    };
    const partyCriteria = {
      ...criteria,
      mode: 'party' as const,
      origin: target.coordinates,
      radiusKm: 40,
      essentials: [] as SearchCriteria['essentials'],
    };
    const before = recommendPlaygrounds([target], partyCriteria)[0];
    const after = recommendPlaygrounds([target], partyCriteria, [memory])[0];
    expect(after.score).toBeLessThan(before.score);
  });

  it('handles impossible combinations honestly', () => {
    const result = recommendPlaygrounds(playgrounds, {
      ...criteria,
      origin: { lat: -32.8, lng: 116.8 },
      radiusKm: 5,
      essentials: ['bbq', 'shelter', 'toilets', 'seating', 'fenced', 'accessibleEquipment', 'openLawn', 'shade'],
    });
    expect(result).toEqual([]);
  });

  it('calculates local straight-line distance', () => {
    expect(distanceKm(criteria.origin, criteria.origin)).toBe(0);
    expect(distanceKm(criteria.origin, { lat: -31.9523, lng: 115.8613 })).toBeGreaterThan(2);
  });

  it('uses a deterministic approximate drive-time hard limit', () => {
    const near = playgrounds[0];
    const result = recommendPlaygrounds(
      [near],
      { ...criteria, origin: near.coordinates, travelLimitMode: 'drive-time', maxDriveMinutes: 10, essentials: [] },
    );
    expect(estimateDriveMinutes(10)).toBe(20);
    expect(result).toHaveLength(1);
    expect(result.every((item) => item.estimatedDriveMinutes <= 10)).toBe(true);
  });

  it('lets explore browse the full curated collection', () => {
    const result = recommendPlaygrounds(playgrounds, { ...criteria, mode: 'explore', radiusKm: 5, essentials: [] }, [], null, playgrounds.length);
    expect(result).toHaveLength(playgrounds.length);
  });
});
