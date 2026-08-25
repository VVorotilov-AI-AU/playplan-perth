import { readFile, writeFile } from 'node:fs/promises';

const [localitiesPath, lgasPath] = process.argv.slice(2);

if (!localitiesPath || !lgasPath) {
  console.error('Usage: node scripts/build-suburbs.mjs <localities.geojson> <perth-lgas.geojson>');
  process.exit(1);
}

const [localities, lgas] = await Promise.all([
  readFile(localitiesPath, 'utf8').then(JSON.parse),
  readFile(lgasPath, 'utf8').then(JSON.parse),
]);

function outerRings(geometry) {
  if (geometry.type === 'Polygon') return [geometry.coordinates[0]];
  if (geometry.type === 'MultiPolygon') {
    return geometry.coordinates.map((polygon) => polygon[0]);
  }
  return [];
}

function ringArea(ring) {
  return Math.abs(
    ring.reduce((sum, point, index) => {
      const next = ring[(index + 1) % ring.length];
      return sum + point[0] * next[1] - next[0] * point[1];
    }, 0) / 2,
  );
}

function pointInRing([x, y], ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[previous];
    const crosses = y1 > y !== y2 > y && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1;
    if (crosses) inside = !inside;
  }
  return inside;
}

function pointInGeometry(point, geometry) {
  return outerRings(geometry).some((ring) => pointInRing(point, ring));
}

function geometryBounds(geometry) {
  return outerRings(geometry).flat().reduce(
    (result, [x, y]) => ({
      minX: Math.min(result.minX, x),
      minY: Math.min(result.minY, y),
      maxX: Math.max(result.maxX, x),
      maxY: Math.max(result.maxY, y),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  );
}

function boundsOverlap(a, b) {
  return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
}

function representativePoint(geometry) {
  const ring = outerRings(geometry).sort((a, b) => ringArea(b) - ringArea(a))[0];
  let twiceArea = 0;
  let xTotal = 0;
  let yTotal = 0;

  for (let index = 0; index < ring.length - 1; index += 1) {
    const [x1, y1] = ring[index];
    const [x2, y2] = ring[index + 1];
    const cross = x1 * y2 - x2 * y1;
    twiceArea += cross;
    xTotal += (x1 + x2) * cross;
    yTotal += (y1 + y2) * cross;
  }

  const centroid = [xTotal / (3 * twiceArea), yTotal / (3 * twiceArea)];
  if (Number.isFinite(centroid[0]) && pointInGeometry(centroid, geometry)) return centroid;

  const bounds = ring.reduce(
    (result, [x, y]) => ({
      minX: Math.min(result.minX, x),
      minY: Math.min(result.minY, y),
      maxX: Math.max(result.maxX, x),
      maxY: Math.max(result.maxY, y),
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity },
  );
  const center = [(bounds.minX + bounds.maxX) / 2, (bounds.minY + bounds.maxY) / 2];
  if (pointInGeometry(center, geometry)) return center;
  return ring[Math.floor(ring.length / 2)];
}

const metroAreas = lgas.features.map((feature) => ({
  ...feature,
  bounds: geometryBounds(feature.geometry),
}));

function touchesMetro(locality) {
  const localityBounds = geometryBounds(locality.geometry);
  const representative = representativePoint(locality.geometry);
  const localityRings = outerRings(locality.geometry);
  return metroAreas.some((lga) => {
    if (!boundsOverlap(localityBounds, lga.bounds)) return false;
    if (pointInGeometry(representative, lga.geometry)) return true;
    return (
      localityRings.some((ring) => {
        const sampleEvery = Math.max(1, Math.floor(ring.length / 20));
        return ring.some((point, index) => index % sampleEvery === 0 && pointInGeometry(point, lga.geometry));
      })
    );
  });
}

const records = localities.features
  .filter((feature) => feature.geometry && touchesMetro(feature))
  .map((feature) => {
    const [lng, lat] = representativePoint(feature.geometry);
    return {
      name: feature.properties.LOC_NAME,
      coordinates: { lat: Number(lat.toFixed(5)), lng: Number(lng.toFixed(5)) },
    };
  })
  .filter((item, index, all) => all.findIndex((candidate) => candidate.name === item.name) === index)
  .sort((a, b) => a.name.localeCompare(b.name, 'en-AU'));

const body = `import type { Coordinates } from '../types';

export interface Suburb {
  name: string;
  coordinates: Coordinates;
}

// Derived from the August 2026 Geoscape Localities dataset (CC BY 4.0),
// limited to the 30 local government areas in the Perth Metropolitan Region.
export const suburbDataSource = {
  title: 'Geoscape Administrative Boundaries: WA Suburb/Locality Boundaries',
  url: 'https://data.gov.au/data/dataset/wa-suburb-locality-boundaries-geoscape-administrative-boundaries',
  verifiedAt: '2026-08-25',
} as const;

export const suburbs: Suburb[] = ${JSON.stringify(records, null, 2)};
`;

await writeFile(new URL('../src/data/suburbs.ts', import.meta.url), body);
console.log(`Wrote ${records.length} Perth metropolitan suburbs.`);
