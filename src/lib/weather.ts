import type { Coordinates, WeatherContext } from '../types';

const CACHE_KEY = 'playplan:weather:v1';
const MAX_AGE_MS = 30 * 60 * 1000;

interface WeatherCache {
  value: WeatherContext;
  lat: number;
  lng: number;
}

function conditionFor(
  temperatureC: number,
  precipitationProbability: number,
): WeatherContext['condition'] {
  if (precipitationProbability >= 40) return 'rainy';
  if (temperatureC >= 28) return 'hot';
  return 'mild';
}

export async function fetchWeather(
  origin: Coordinates,
): Promise<WeatherContext | null> {
  try {
    const cached = JSON.parse(
      window.sessionStorage.getItem(CACHE_KEY) ?? 'null',
    ) as WeatherCache | null;
    if (
      cached &&
      Date.now() - Date.parse(cached.value.fetchedAt) < MAX_AGE_MS &&
      Math.abs(cached.lat - origin.lat) < 0.2 &&
      Math.abs(cached.lng - origin.lng) < 0.2
    ) {
      return cached.value;
    }
  } catch {
    window.sessionStorage.removeItem(CACHE_KEY);
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 2000);
  try {
    const params = new URLSearchParams({
      latitude: String(origin.lat),
      longitude: String(origin.lng),
      current: 'temperature_2m',
      daily: 'precipitation_probability_max,temperature_2m_max',
      timezone: 'Australia/Perth',
      forecast_days: '1',
    });
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
      { signal: controller.signal },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as {
      current?: { temperature_2m?: number };
      daily?: {
        precipitation_probability_max?: number[];
        temperature_2m_max?: number[];
      };
    };
    const temperatureC =
      data.daily?.temperature_2m_max?.[0] ??
      data.current?.temperature_2m ??
      NaN;
    const precipitationProbability =
      data.daily?.precipitation_probability_max?.[0] ?? NaN;
    if (
      !Number.isFinite(temperatureC) ||
      !Number.isFinite(precipitationProbability)
    ) {
      return null;
    }
    const value: WeatherContext = {
      temperatureC,
      precipitationProbability,
      condition: conditionFor(temperatureC, precipitationProbability),
      fetchedAt: new Date().toISOString(),
    };
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ value, lat: origin.lat, lng: origin.lng }),
    );
    return value;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}
