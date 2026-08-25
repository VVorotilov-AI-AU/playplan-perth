import type { Suburb } from '../data/suburbs';

const MAX_RESULTS = 8;

export function matchingSuburbs(suburbs: Suburb[], query: string): Suburb[] {
  const normalized = query.trim().toLocaleLowerCase('en-AU');
  if (!normalized) return suburbs.slice(0, MAX_RESULTS);

  return suburbs
    .filter((suburb) => suburb.name.toLocaleLowerCase('en-AU').includes(normalized))
    .sort((a, b) => {
      const aStarts = a.name.toLocaleLowerCase('en-AU').startsWith(normalized);
      const bStarts = b.name.toLocaleLowerCase('en-AU').startsWith(normalized);
      return Number(bStarts) - Number(aStarts) || a.name.localeCompare(b.name, 'en-AU');
    })
    .slice(0, MAX_RESULTS);
}
