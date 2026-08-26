import type {
  Activity,
  FacilityKey,
  NearbyVerificationGap,
  Playground,
  Recommendation,
  SearchCriteria,
  VisitMemory,
  WeatherContext,
} from '../types';
import { ageToBand } from '../types';

const EARTH_RADIUS_KM = 6371;

export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const radians = (value: number) => (value * Math.PI) / 180;
  const dLat = radians(b.lat - a.lat);
  const dLng = radians(b.lng - a.lng);
  const lat1 = radians(a.lat);
  const lat2 = radians(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

// Local deterministic estimate only. It includes a short access allowance and
// a Perth urban route factor, then rounds up to a useful five-minute band.
export function estimateDriveMinutes(distance: number): number {
  return Math.max(5, Math.ceil((4 + distance * 1.55) / 5) * 5);
}

export function estimateDriveRange(distance: number): { min: number; max: number } {
  const midpoint = estimateDriveMinutes(distance);
  const margin = Math.max(5, Math.ceil((midpoint * 0.25) / 5) * 5);
  return {
    min: Math.max(5, midpoint - margin),
    max: midpoint + margin,
  };
}

function ageScore(playground: Playground, ages: number[]): number {
  if (ages.length === 0) return 70;
  const coverage: number[] = ages.map((age) =>
    playground.ageBands.includes(ageToBand(age)) ? 100 : 0,
  );
  const minimum = Math.min(...coverage);
  const average = coverage.reduce((sum, item) => sum + item, 0) / coverage.length;
  return minimum * 0.6 + average * 0.4;
}

function activityScore(
  playground: Playground,
  preferences: Activity[],
): number {
  if (preferences.length === 0) return 70;
  const matches = preferences.filter((item) =>
    playground.activities.includes(item),
  ).length;
  return (matches / preferences.length) * 100;
}

function facilitiesScore(playground: Playground): number {
  const values = Object.values(playground.facilities);
  const confirmed = values.filter((value) => value === 'yes').length;
  const unknown = values.filter((value) => value === 'unknown').length;
  return ((confirmed + unknown * 0.25) / values.length) * 100;
}

function partyFacilitiesScore(playground: Playground): number {
  const keys: Array<keyof Playground['facilities']> = [
    'bbq',
    'shelter',
    'toilets',
    'seating',
    'openLawn',
  ];
  return (
    (keys.reduce((sum, key) => {
      const value = playground.facilities[key];
      return sum + (value === 'yes' ? 1 : value === 'unknown' ? 0.2 : 0);
    }, 0) /
      keys.length) *
    100
  );
}

function accessibilityScore(playground: Playground): number {
  const equipment = playground.facilities.accessibleEquipment;
  const toilets = playground.facilities.toilets;
  return (
    (equipment === 'yes' ? 65 : equipment === 'unknown' ? 20 : 0) +
    (toilets === 'yes' ? 35 : toilets === 'unknown' ? 10 : 0)
  );
}

function distanceScore(distance: number, radius: number): number {
  return Math.max(0, 100 - (distance / radius) * 100);
}

function weatherScore(
  playground: Playground,
  weather: WeatherContext | null,
): number | null {
  if (!weather) return null;
  if (weather.condition === 'hot') {
    const shade = playground.facilities.shade === 'yes' ? 70 : 15;
    const water = playground.activities.includes('water-play') ? 30 : 0;
    return shade + water;
  }
  if (weather.condition === 'rainy') {
    return playground.facilities.shelter === 'yes' ? 100 : 20;
  }
  return 80;
}

function memoryScore(
  playground: Playground,
  memories: VisitMemory[],
  criteria: SearchCriteria,
): number {
  const visits = memories.filter((item) => item.playgroundId === playground.id);
  if (visits.length === 0) return 60;
  const tags = new Set(visits.flatMap((visit) => visit.tags));
  let score = 55;
  if (tags.has('kids-loved-it')) score += 25;
  if (tags.has('visit-again')) score += 20;
  if (tags.has('age-mismatch')) score -= 35;
  if (tags.has('too-hot')) score -= 15;
  if (tags.has('equipment-hot')) score -= 15;
  if (tags.has('too-crowded')) score -= 10;
  if (tags.has('parking-difficult')) score -= 10;
  if (tags.has('easy-parking')) score += 5;
  if (tags.has('good-sightlines')) score += 10;
  if (tags.has('pram-friendly')) score += 5;
  if (tags.has('toilets-easy')) score += 5;
  if (tags.has('toddler-friendly') && criteria.ages.some((age) => age <= 3)) {
    score += 15;
  }
  if (tags.has('bbq-occupied') && criteria.mode === 'party') score -= 10;
  return Math.max(0, Math.min(100, score));
}

function noveltyScore(playground: Playground, memories: VisitMemory[]): number {
  return memories.some((item) => item.playgroundId === playground.id) ? 25 : 100;
}

function weightedScore(
  criteria: SearchCriteria,
  playground: Playground,
  distance: number,
  memories: VisitMemory[],
  weather: WeatherContext | null,
): number {
  const weatherValue = weatherScore(playground, weather);
  const travelDistance =
    criteria.travelLimitMode === 'drive-time'
      ? estimateDriveMinutes(distance)
      : distance;
  const travelLimit =
    criteria.travelLimitMode === 'drive-time'
      ? criteria.maxDriveMinutes
      : criteria.radiusKm;
  const common = {
    age: ageScore(playground, criteria.ages),
    activity: activityScore(playground, criteria.preferences),
    distance: distanceScore(travelDistance, travelLimit),
    facilities: facilitiesScore(playground),
    party: partyFacilitiesScore(playground),
    accessibility: accessibilityScore(playground),
    weather: weatherValue,
    memory: memoryScore(playground, memories, criteria),
    novelty: noveltyScore(playground, memories),
    standout: Math.min(100, playground.standoutFeatures.length * 25),
    openSpace: playground.facilities.openLawn === 'yes' ? 100 : 25,
  };

  const entries =
    criteria.mode === 'party'
      ? [
          [common.party, 35],
          [common.age, 20],
          [common.accessibility, 10],
          [common.openSpace, 10],
          [common.distance, 10],
          [common.weather, 10],
          [common.memory, 5],
        ]
      : criteria.mode === 'explore'
        ? [
            [common.age, 25],
            [common.activity, 20],
            [common.novelty, 20],
            [common.standout, 15],
            [common.distance, 10],
            [common.weather, 5],
            [common.memory, 5],
          ]
        : [
            [common.age, 30],
            [common.activity, 15],
            [common.distance, 30],
            [common.facilities, 10],
            [common.weather, 5],
            [common.memory, 10],
          ];

  const active = entries.filter(
    (entry): entry is [number, number] => entry[0] !== null,
  );
  const totalWeight = active.reduce((sum, [, weight]) => sum + weight, 0);
  const score = active.reduce(
    (sum, [value, weight]) => sum + value * (weight / totalWeight),
    0,
  );
  return score;
}

function buildReasons(
  playground: Playground,
  criteria: SearchCriteria,
  weather: WeatherContext | null,
): string[] {
  const reasons: string[] = [];
  const allAgesFit =
    criteria.ages.length === 0 ||
    criteria.ages.every((age) => playground.ageBands.includes(ageToBand(age)));
  if (allAgesFit) reasons.push('Works across all selected ages');
  if (criteria.preferences.length) {
    const matches = criteria.preferences.filter((activity) =>
      playground.activities.includes(activity),
    );
    if (matches.length) {
      reasons.push(
        `Matches ${matches
          .slice(0, 2)
          .map((item) => item.replace('-', ' '))
          .join(' and ')}`,
      );
    }
  }
  if (criteria.mode === 'party' && playground.facilities.bbq === 'yes') {
    reasons.push('Confirmed BBQ and picnic facilities');
  }
  if (playground.facilities.accessibleEquipment === 'yes') {
    reasons.push('Confirmed accessible play equipment');
  }
  if (
    weather?.condition === 'hot' &&
    playground.facilities.shade === 'yes'
  ) {
    reasons.push('A stronger choice for today’s heat');
  }
  if (
    weather?.condition === 'rainy' &&
    playground.facilities.shelter === 'yes'
  ) {
    reasons.push('Shelter confirmed for possible rain');
  }
  if (reasons.length < 2) reasons.push(playground.standoutFeatures[0]);
  return reasons.slice(0, 3);
}

function buildTradeoffs(playground: Playground): string[] {
  const tradeoffs = [...playground.cautions];
  const unknowns = Object.entries(playground.facilities)
    .filter(([, value]) => value === 'unknown')
    .map(([key]) => key);
  if (unknowns.length) {
    tradeoffs.push(
      `${unknowns
        .slice(0, 2)
        .map((item) => item.replace(/([A-Z])/g, ' $1').toLowerCase())
        .join(' and ')} unconfirmed`,
    );
  }
  if (playground.facilities.fenced === 'no') {
    tradeoffs.push('Play space is not fenced');
  }
  return tradeoffs.slice(0, 2);
}

export function recommendPlaygrounds(
  playgrounds: Playground[],
  criteria: SearchCriteria,
  memories: VisitMemory[] = [],
  weather: WeatherContext | null = null,
  limit = 3,
): Recommendation[] {
  return playgrounds
    .map((playground) => ({
      playground,
      distance: distanceKm(criteria.origin, playground.coordinates),
    }))
    .filter(({ playground, distance }) => {
      if (
        criteria.mode !== 'explore' &&
        (criteria.travelLimitMode === 'drive-time'
          ? estimateDriveMinutes(distance) > criteria.maxDriveMinutes
          : distance > criteria.radiusKm)
      ) return false;
      return criteria.essentials.every(
        (key) => playground.facilities[key] === 'yes',
      );
    })
    .map(({ playground, distance }) => {
      const driveRange = estimateDriveRange(distance);
      return {
        playground,
        score: Math.round(
          weightedScore(criteria, playground, distance, memories, weather),
        ),
        distanceKm: Math.round(distance * 10) / 10,
        estimatedDriveMinutes: estimateDriveMinutes(distance),
        estimatedDriveMinutesMin: driveRange.min,
        estimatedDriveMinutesMax: driveRange.max,
        reasons: buildReasons(playground, criteria, weather),
        tradeoffs: buildTradeoffs(playground),
        evidenceWarning:
          playground.verificationMethod === 'ai-assisted-source-review'
            ? 'AI checked the identity, location and source. Unlisted age and facility details remain unconfirmed.'
            : playground.status === 'check-before-visit'
            ? 'Details may be changing. Check the official source before leaving.'
            : undefined,
      };
    })
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.distanceKm - b.distanceKm ||
        a.playground.name.localeCompare(b.playground.name),
    )
    .slice(0, limit);
}

export function findNearbyVerificationGaps(
  playgrounds: Playground[],
  criteria: SearchCriteria,
  limit = 3,
): NearbyVerificationGap[] {
  if (criteria.mode === 'explore' || criteria.essentials.length === 0) return [];

  return playgrounds
    .map((playground) => ({
      playground,
      distance: distanceKm(criteria.origin, playground.coordinates),
    }))
    .filter(({ playground, distance }) => {
      if (distance > 10) return false;
      const values = criteria.essentials.map((key) => playground.facilities[key]);
      return values.includes('unknown') && !values.includes('no');
    })
    .map(({ playground, distance }) => {
      const driveRange = estimateDriveRange(distance);
      return {
        playground,
        distanceKm: Math.round(distance * 10) / 10,
        estimatedDriveMinutesMin: driveRange.min,
        estimatedDriveMinutesMax: driveRange.max,
        missingEssentials: criteria.essentials.filter(
          (key): key is FacilityKey => playground.facilities[key] === 'unknown',
        ),
        confirmedEssentials: criteria.essentials.filter(
          (key): key is FacilityKey => playground.facilities[key] === 'yes',
        ),
      };
    })
    .sort(
      (a, b) =>
        a.missingEssentials.length - b.missingEssentials.length ||
        a.distanceKm - b.distanceKm ||
        a.playground.name.localeCompare(b.playground.name),
    )
    .slice(0, limit);
}
