import { z } from 'zod';

export const TriStateSchema = z.enum(['yes', 'no', 'unknown']);
export type TriState = z.infer<typeof TriStateSchema>;

export const AgeBandSchema = z.enum(['1-3', '4-6', '7-9', '10-12']);
export type AgeBand = z.infer<typeof AgeBandSchema>;

export const ActivitySchema = z.enum([
  'climbing',
  'swings',
  'slides',
  'nature-play',
  'water-play',
  'wheels',
  'sports',
  'sand-play',
  'sensory-play',
  'flying-fox',
]);
export type Activity = z.infer<typeof ActivitySchema>;

export const FacilityKeySchema = z.enum([
  'bbq',
  'shelter',
  'toilets',
  'seating',
  'fenced',
  'accessibleEquipment',
  'openLawn',
  'shade',
]);
export type FacilityKey = z.infer<typeof FacilityKeySchema>;

export const EvidenceSchema = z.object({
  fields: z.array(z.string()).min(1),
  sourceUrl: z.string().url(),
  sourceTitle: z.string().min(3),
  verifiedAt: z.string().date(),
  confidence: z.enum(['high', 'medium']),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

const FacilitiesSchema = z.object({
  bbq: TriStateSchema,
  shelter: TriStateSchema,
  toilets: TriStateSchema,
  seating: TriStateSchema,
  fenced: TriStateSchema,
  accessibleEquipment: TriStateSchema,
  openLawn: TriStateSchema,
  shade: TriStateSchema,
});

export const PlaygroundSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  suburb: z.string().min(2),
  council: z.string().min(3),
  address: z.string().min(5),
  coordinates: z.object({
    lat: z.number().min(-33).max(-31),
    lng: z.number().min(115).max(117),
  }),
  ageBands: z.array(AgeBandSchema).min(1),
  activities: z.array(ActivitySchema).min(1),
  facilities: FacilitiesSchema,
  standoutFeatures: z.array(z.string()).min(1),
  cautions: z.array(z.string()),
  bookingUrl: z.string().url().optional(),
  evidence: z.array(EvidenceSchema).min(1),
  status: z.enum(['open', 'check-before-visit']),
  googleMapsUrl: z.string().url().includes('google.com/maps'),
});
export type Playground = z.infer<typeof PlaygroundSchema>;

export type Mode = 'today' | 'party' | 'explore';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface SearchCriteria {
  mode: Mode;
  ages: number[];
  origin: Coordinates;
  originLabel: string;
  radiusKm: number;
  essentials: FacilityKey[];
  preferences: Activity[];
}

export type VisitTag =
  | 'kids-loved-it'
  | 'too-crowded'
  | 'too-hot'
  | 'age-mismatch'
  | 'bbq-occupied'
  | 'visit-again';

export interface VisitMemory {
  playgroundId: string;
  visitedAt: string;
  tags: VisitTag[];
  note?: string;
  mode: Mode;
  ages: number[];
}

export interface WeatherContext {
  temperatureC: number;
  precipitationProbability: number;
  condition: 'hot' | 'rainy' | 'mild';
  fetchedAt: string;
}

export interface Recommendation {
  playground: Playground;
  score: number;
  distanceKm: number;
  reasons: string[];
  tradeoffs: string[];
  evidenceWarning?: string;
}

export interface RecommendationNarrator {
  explain(
    criteria: SearchCriteria,
    recommendations: Recommendation[],
  ): Promise<Record<string, string>>;
}

export function ageToBand(age: number): AgeBand {
  if (age <= 3) return '1-3';
  if (age <= 6) return '4-6';
  if (age <= 9) return '7-9';
  return '10-12';
}
