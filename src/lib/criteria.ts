import type { SearchCriteria } from '../types';

interface NamedOrigin {
  name: string;
  coordinates: SearchCriteria['origin'];
}

export function restoreCriteria(
  defaults: SearchCriteria,
  saved: Partial<SearchCriteria>,
  mode: SearchCriteria['mode'],
  origins: NamedOrigin[],
): SearchCriteria {
  const savedOrigin = origins.find((item) => item.name === saved.originLabel);
  return {
    ...defaults,
    ...saved,
    mode,
    origin: savedOrigin?.coordinates ?? defaults.origin,
    originLabel: savedOrigin?.name ?? defaults.originLabel,
  };
}
