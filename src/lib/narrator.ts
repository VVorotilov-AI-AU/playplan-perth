import type {
  Recommendation,
  RecommendationNarrator,
  SearchCriteria,
} from '../types';

export const AI_EXPLANATIONS = false;

export class DeterministicNarrator implements RecommendationNarrator {
  async explain(
    _criteria: SearchCriteria,
    recommendations: Recommendation[],
  ): Promise<Record<string, string>> {
    return Object.fromEntries(
      recommendations.map((item) => [
        item.playground.id,
        item.reasons.join('. ') + '.',
      ]),
    );
  }
}

export class RemoteNarrator implements RecommendationNarrator {
  constructor(private readonly endpoint: string) {}

  async explain(
    criteria: SearchCriteria,
    recommendations: Recommendation[],
  ): Promise<Record<string, string>> {
    const payload = {
      mode: criteria.mode,
      ages: criteria.ages,
      radiusKm: criteria.radiusKm,
      travelLimitMode: criteria.travelLimitMode,
      maxDriveMinutes: criteria.maxDriveMinutes,
      essentials: criteria.essentials,
      preferences: criteria.preferences,
      candidates: recommendations.map((item) => ({
        id: item.playground.id,
        score: item.score,
        reasons: item.reasons,
        tradeoffs: item.tradeoffs,
      })),
    };
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(1800),
    });
    if (!response.ok) throw new Error('Narrator unavailable');
    return (await response.json()) as Record<string, string>;
  }
}

export function createNarrator(): RecommendationNarrator {
  const endpoint = import.meta.env.VITE_AI_ENDPOINT as string | undefined;
  if (AI_EXPLANATIONS && endpoint) return new RemoteNarrator(endpoint);
  return new DeterministicNarrator();
}
