import {
  Accessibility,
  ArrowLeft,
  BarChart3,
  Car,
  Check,
  ChevronRight,
  Clock3,
  CloudSun,
  Compass,
  ExternalLink,
  Flame,
  Heart,
  Info,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Navigation,
  PartyPopper,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TentTree,
  Toilet,
  TreePine,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ParkMap } from './components/ParkMap';
import { SuburbCombobox } from './components/SuburbCombobox';
import { playgroundCount, playgrounds } from './data/playgrounds';
import { suburbDataSource, suburbs } from './data/suburbs';
import { createNarrator } from './lib/narrator';
import { restoreCriteria } from './lib/criteria';
import { findNearbyVerificationGaps, recommendPlaygrounds } from './lib/recommend';
import {
  loadCriteria,
  loadFavorites,
  loadMemories,
  saveCriteria,
  saveFavorites,
  saveMemories,
} from './lib/storage';
import { fetchWeather } from './lib/weather';
import type {
  Activity,
  FacilityKey,
  Mode,
  Playground,
  Recommendation,
  SearchCriteria,
  VisitMemory,
  VisitContext,
  VisitTag,
  WeatherContext,
} from './types';

const facilityOptions: Array<{
  key: FacilityKey;
  label: string;
  icon: typeof Sun;
}> = [
  { key: 'shade', label: 'Shade', icon: Sun },
  { key: 'toilets', label: 'Toilets', icon: Toilet },
  { key: 'bbq', label: 'BBQ on site', icon: Flame },
  { key: 'shelter', label: 'Shelter', icon: TentTree },
  { key: 'fenced', label: 'Fenced', icon: ShieldCheck },
  { key: 'accessibleEquipment', label: 'Accessible play', icon: Accessibility },
  { key: 'seating', label: 'Seating', icon: Users },
  { key: 'openLawn', label: 'Open lawn', icon: TreePine },
];

const activityOptions: Array<{ key: Activity; label: string }> = [
  { key: 'climbing', label: 'Climbing' },
  { key: 'swings', label: 'Swings' },
  { key: 'slides', label: 'Big slides' },
  { key: 'nature-play', label: 'Nature play' },
  { key: 'water-play', label: 'Water play' },
  { key: 'wheels', label: 'Scooters & bikes' },
  { key: 'sports', label: 'Ball sports' },
  { key: 'sand-play', label: 'Sand play' },
  { key: 'sensory-play', label: 'Sensory play' },
  { key: 'flying-fox', label: 'Flying fox' },
];

const visitTagLabels: Record<VisitTag, string> = {
  'kids-loved-it': 'Kids loved it',
  'visit-again': 'Visit again',
  'too-crowded': 'Too crowded',
  'too-hot': 'Too hot overall',
  'equipment-hot': 'Equipment was hot',
  'age-mismatch': 'Age mismatch',
  'bbq-occupied': 'BBQ occupied',
  'toddler-friendly': 'Toddler friendly',
  'good-sightlines': 'Easy to supervise',
  'pram-friendly': 'Pram friendly',
  'easy-parking': 'Easy parking',
  'parking-difficult': 'Parking difficult',
  'toilets-easy': 'Toilets easy to reach',
};

const visitGroups: Array<{ label: string; options: VisitTag[] }> = [
  {
    label: 'Play and supervision',
    options: [
      'kids-loved-it',
      'visit-again',
      'toddler-friendly',
      'good-sightlines',
      'age-mismatch',
      'too-crowded',
      'equipment-hot',
      'too-hot',
    ],
  },
  {
    label: 'Arrival and practicalities',
    options: [
      'easy-parking',
      'parking-difficult',
      'pram-friendly',
      'toilets-easy',
      'bbq-occupied',
    ],
  },
];

const visitContextOptions: Array<{ key: VisitContext; label: string }> = [
  { key: 'weekday-morning', label: 'Weekday morning' },
  { key: 'weekday-afternoon', label: 'Weekday afternoon' },
  { key: 'weekend-morning', label: 'Weekend morning' },
  { key: 'weekend-afternoon', label: 'Weekend afternoon' },
];

const modeMeta: Record<
  Mode,
  { label: string; copy: string; icon: typeof Search }
> = {
  today: {
    label: 'Go today',
    copy: 'Three choices for this family, from here, right now.',
    icon: Navigation,
  },
  party: {
    label: 'Plan a party',
    copy: 'Find the facilities that make a gathering easier.',
    icon: PartyPopper,
  },
  explore: {
    label: 'Explore Perth',
    copy: 'Browse the full curated collection on the map.',
    icon: Compass,
  },
};

const defaultCriteria: SearchCriteria = {
  mode: 'today',
  ages: [3, 8],
  origin: suburbs.find((item) => item.name === 'Subiaco')!.coordinates,
  originLabel: 'Subiaco',
  travelLimitMode: 'distance',
  radiusKm: 15,
  maxDriveMinutes: 30,
  essentials: ['shade', 'toilets', 'bbq'],
  preferences: ['climbing', 'water-play'],
};

function hashMode(): Mode {
  const route = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return route === 'party' || route === 'explore' ? route : 'today';
}

function hashPark(): Playground | null {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/');
  return parts[0] === 'park'
    ? playgrounds.find((item) => item.id === parts[1]) ?? null
    : null;
}

function facilityLabel(key: FacilityKey): string {
  return facilityOptions.find((item) => item.key === key)?.label ?? key;
}

function App() {
  const saved = loadCriteria();
  const [criteria, setCriteria] = useState<SearchCriteria>(() =>
    restoreCriteria(defaultCriteria, saved, hashMode(), suburbs),
  );
  const [memories, setMemories] = useState<VisitMemory[]>(loadMemories);
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);
  const [weather, setWeather] = useState<WeatherContext | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<
    'idle' | 'loading' | 'ready' | 'unavailable'
  >('idle');
  const [searched, setSearched] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const [detailPark, setDetailPark] = useState<Playground | null>(hashPark);
  const [notePark, setNotePark] = useState<Playground | null>(null);
  const [noteTags, setNoteTags] = useState<VisitTag[]>([]);
  const [noteText, setNoteText] = useState('');
  const [noteContext, setNoteContext] = useState<VisitContext>();
  const [saveConfirmation, setSaveConfirmation] = useState('');
  const [gpsStatus, setGpsStatus] = useState<
    'idle' | 'loading' | 'denied' | 'ready'
  >('idle');
  const [sort, setSort] = useState<'best' | 'nearest' | 'new'>('best');
  const [narration, setNarration] = useState<Record<string, string>>({});

  const recommendations = useMemo(() => {
    const limit = criteria.mode === 'explore' ? playgrounds.length : 3;
    const base = recommendPlaygrounds(
      playgrounds,
      criteria,
      memories,
      weather,
      limit,
    );
    if (criteria.mode !== 'explore' || sort === 'best') return base;
    if (sort === 'nearest') {
      return [...base].sort((a, b) => a.distanceKm - b.distanceKm);
    }
    return [...base].sort((a, b) => {
      const aVisited = memories.some(
        (item) => item.playgroundId === a.playground.id,
      );
      const bVisited = memories.some(
        (item) => item.playgroundId === b.playground.id,
      );
      return Number(aVisited) - Number(bVisited) || b.score - a.score;
    });
  }, [criteria, memories, sort, weather]);

  const showResults = searched || criteria.mode === 'explore';
  const nearbyVerificationGaps = useMemo(
    () => showResults
      ? findNearbyVerificationGaps(playgrounds, criteria, 3)
      : [],
    [criteria, showResults],
  );
  const noNearbyVerifiedMatch =
    criteria.mode !== 'explore' &&
    recommendations.length > 0 &&
    recommendations.every((item) => item.distanceKm > 10);

  useEffect(() => {
    function syncHash() {
      const mode = hashMode();
      const parts = window.location.hash.replace(/^#\/?/, '').split('/');
      if (parts[0] !== 'park') {
        setCriteria((current) => ({ ...current, mode }));
      }
      if (parts[0] === 'park' && parts[1]) {
        setDetailPark(
          playgrounds.find((item) => item.id === parts[1]) ?? null,
        );
      } else if (parts[0] !== 'park') {
        setDetailPark(null);
      }
    }
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    saveCriteria(criteria);
  }, [criteria]);

  useEffect(() => {
    if (!showResults || recommendations.length === 0) {
      setNarration({});
      return;
    }
    createNarrator()
      .explain(criteria, recommendations.slice(0, 3))
      .then(setNarration)
      .catch(() => setNarration({}));
  }, [criteria, recommendations, showResults]);

  function changeMode(mode: Mode) {
    const partyEssentials: FacilityKey[] = [
      'bbq',
      'shelter',
      'toilets',
      'seating',
      'openLawn',
    ];
    setCriteria((current) => ({
      ...current,
      mode,
      essentials:
        mode === 'party'
          ? partyEssentials
          : mode === 'explore'
            ? []
          : mode === 'today' && current.mode === 'party'
            ? ['shade', 'toilets']
            : mode === 'today' && current.mode === 'explore'
              ? ['shade', 'toilets']
            : current.essentials,
    }));
    setSearched(mode === 'explore');
    window.location.hash = `#/${mode}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toggleAge(age: number) {
    setCriteria((current) => {
      if (current.ages.includes(age)) {
        return { ...current, ages: current.ages.filter((item) => item !== age) };
      }
      if (current.ages.length >= 4) return current;
      return { ...current, ages: [...current.ages, age] };
    });
  }

  function toggleFacility(key: FacilityKey) {
    setCriteria((current) => ({
      ...current,
      essentials: current.essentials.includes(key)
        ? current.essentials.filter((item) => item !== key)
        : [...current.essentials, key],
    }));
  }

  function togglePreference(key: Activity) {
    setCriteria((current) => ({
      ...current,
      preferences: current.preferences.includes(key)
        ? current.preferences.filter((item) => item !== key)
        : [...current.preferences, key],
    }));
  }

  function selectSuburb(name: string) {
    const suburb = suburbs.find((item) => item.name === name);
    if (!suburb) return;
    setGpsStatus('idle');
    setCriteria((current) => ({
      ...current,
      origin: suburb.coordinates,
      originLabel: suburb.name,
    }));
  }

  function useLocation() {
    if (!navigator.geolocation) {
      setGpsStatus('denied');
      return;
    }
    setGpsStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCriteria((current) => ({
          ...current,
          origin: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          originLabel: 'Current location (not saved)',
        }));
        setGpsStatus('ready');
      },
      () => setGpsStatus('denied'),
      { timeout: 7000, maximumAge: 300000, enableHighAccuracy: false },
    );
  }

  async function searchParks() {
    setSearched(true);
    setWeatherStatus('loading');
    setSelectedId(undefined);
    window.setTimeout(
      () =>
        document
          .getElementById('results')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      50,
    );
    const result = await fetchWeather(criteria.origin);
    setWeather(result);
    setWeatherStatus(result ? 'ready' : 'unavailable');
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];
    setFavorites(next);
    saveFavorites(next);
  }

  function openDetail(park: Playground) {
    setDetailPark(park);
    window.location.hash = `#/park/${park.id}`;
  }

  function closeDetail() {
    setDetailPark(null);
    window.location.hash = `#/${criteria.mode}`;
  }

  function saveVisit() {
    if (!notePark || noteTags.length === 0) return;
    const entry: VisitMemory = {
      playgroundId: notePark.id,
      visitedAt: new Date().toISOString(),
      tags: noteTags,
      note: noteText.trim() || undefined,
      mode: criteria.mode,
      ages: criteria.ages,
      context: noteContext,
    };
    const next = [entry, ...memories].slice(0, 100);
    setMemories(next);
    saveMemories(next);
    setNotePark(null);
    setNoteTags([]);
    setNoteText('');
    setNoteContext(undefined);
    setSaveConfirmation(`Saved privately for ${notePark.name}. Future matches now use this visit.`);
    window.setTimeout(() => setSaveConfirmation(''), 4500);
  }

  const ModeIcon = modeMeta[criteria.mode].icon;

  return (
    <main className="min-h-screen bg-sand text-ink">
      <header className="site-header">
        <a href="#/today" className="brand" onClick={() => changeMode('today')}>
          <span className="brand-mark">P</span>
          <span>PlayPlan Perth</span>
        </a>
        <span className="coverage-pill">
          <MapPin size={14} aria-hidden="true" />
          {playgroundCount} showcase places
        </span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">School holidays, sorted</p>
          <h1>Pick a park everyone loves.</h1>
          <p className="hero-lede">
            Match Perth playgrounds to your children&apos;s ages, today&apos;s
            plan and the facilities your family actually needs. This growing
            100+ place showcase is not a complete directory of Perth playgrounds.
          </p>
          <div className="trust-row">
            <span><ShieldCheck size={17} /> Evidence shown</span>
            <span><Heart size={17} /> Notes stay private</span>
            <span><CloudSun size={17} /> Weather-aware</span>
          </div>
          <a className="hero-cta" href="#planner-title">
            Start choosing <ChevronRight size={18} />
          </a>
        </div>

        <div className="mode-card">
          <p className="step-label">Start with your plan</p>
          <div className="mode-grid" role="tablist" aria-label="Planning mode">
            {(Object.keys(modeMeta) as Mode[]).map((mode) => {
              const item = modeMeta[mode];
              const Icon = item.icon;
              return (
                <button
                  key={mode}
                  type="button"
                  role="tab"
                  aria-selected={criteria.mode === mode}
                  className={criteria.mode === mode ? 'mode-button active' : 'mode-button'}
                  onClick={() => changeMode(mode)}
                >
                  <Icon size={22} />
                  <strong>{item.label}</strong>
                  <span>{item.copy}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="planner-section" aria-labelledby="planner-title">
        <div className="section-heading">
          <span className="section-icon"><ModeIcon size={23} /></span>
          <div>
            <p className="step-label">{modeMeta[criteria.mode].label}</p>
            <h2 id="planner-title">
              {criteria.mode === 'party'
                ? 'What will make the gathering work?'
                : criteria.mode === 'explore'
                  ? 'Shape your discovery map'
                  : 'Tell us what matters today'}
            </h2>
          </div>
        </div>

        <div className="planner-grid">
          <section className="input-panel">
            <div className="field-block">
              <div className="field-heading">
                <div>
                  <span className="field-number">1</span>
                  <h3>Who&apos;s playing?</h3>
                </div>
                <span>{criteria.ages.length}/4 selected</span>
              </div>
              <div className="age-grid" aria-label="Children's ages">
                {Array.from({ length: 12 }, (_, index) => index + 1).map((age) => (
                  <button
                    key={age}
                    type="button"
                    aria-pressed={criteria.ages.includes(age)}
                    className={criteria.ages.includes(age) ? 'age-button active' : 'age-button'}
                    onClick={() => toggleAge(age)}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <div className="field-heading">
                <div>
                  <span className="field-number">2</span>
                  <h3>Where are you starting?</h3>
                </div>
              </div>
              <div className="location-row">
                <SuburbCombobox
                  suburbs={suburbs}
                  value={criteria.originLabel}
                  onSelect={selectSuburb}
                />
                <button
                  type="button"
                  className="secondary-button"
                  onClick={useLocation}
                  disabled={gpsStatus === 'loading'}
                >
                  <LocateFixed size={18} />
                  {gpsStatus === 'loading' ? 'Locating…' : 'Use my location'}
                </button>
              </div>
              {gpsStatus === 'denied' && (
                <p className="inline-note">Location was unavailable. Your suburb selection still works.</p>
              )}
              {gpsStatus === 'ready' && (
                <p className="inline-note success">Current location is used once and never saved.</p>
              )}
              <div className="travel-limit-grid">
                <fieldset className="travel-limit-column">
                  <legend>By distance</legend>
                  <div className="radius-row" aria-label="Straight-line distance limit">
                    {[5, 10, 15, 25, 40].map((radius) => (
                      <button
                        key={radius}
                        type="button"
                        aria-pressed={criteria.travelLimitMode === 'distance' && criteria.radiusKm === radius}
                        className={criteria.travelLimitMode === 'distance' && criteria.radiusKm === radius ? 'radius-button active' : 'radius-button'}
                        onClick={() =>
                          setCriteria((current) => ({ ...current, travelLimitMode: 'distance', radiusKm: radius }))
                        }
                      >
                        {radius} km
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset className="travel-limit-column">
                  <legend>By rough drive area</legend>
                  <div className="radius-row" aria-label="Rough drive-time search area">
                    {[10, 20, 30, 45, 60].map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        aria-pressed={criteria.travelLimitMode === 'drive-time' && criteria.maxDriveMinutes === minutes}
                        className={criteria.travelLimitMode === 'drive-time' && criteria.maxDriveMinutes === minutes ? 'radius-button active' : 'radius-button'}
                        onClick={() =>
                          setCriteria((current) => ({ ...current, travelLimitMode: 'drive-time', maxDriveMinutes: minutes }))
                        }
                      >
                        ~{minutes} min area
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
              <p className="distance-note">Choose one search area. Kilometres are straight-line. Drive ranges are rough local estimates, not routes or live traffic. Google Maps provides the actual journey.</p>
            </div>

            <div className="field-block">
              <div className="field-heading">
                <div>
                  <span className="field-number">3</span>
                  <h3>What must be there?</h3>
                </div>
                <span>Hard requirements</span>
              </div>
              <div className="chip-grid">
                {facilityOptions.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={criteria.essentials.includes(key)}
                    className={criteria.essentials.includes(key) ? 'choice-chip active' : 'choice-chip'}
                    onClick={() => toggleFacility(key)}
                  >
                    <Icon size={17} />
                    {label}
                    {criteria.essentials.includes(key) && <Check size={15} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-block">
              <div className="field-heading">
                <div>
                  <span className="field-number">4</span>
                  <h3>What sounds fun?</h3>
                </div>
                <span>Optional preferences</span>
              </div>
              <div className="preference-grid">
                {activityOptions.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={criteria.preferences.includes(key)}
                    className={criteria.preferences.includes(key) ? 'preference-chip active' : 'preference-chip'}
                    onClick={() => togglePreference(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {criteria.mode !== 'explore' && (
              <button
                type="button"
                className="primary-button"
                onClick={searchParks}
                disabled={criteria.ages.length === 0}
              >
                <Search size={20} />
                Find our best three
                <ChevronRight size={20} />
              </button>
            )}
          </section>

          <aside className="privacy-card">
            <div className="privacy-art" aria-hidden="true">
              <span className="sun-orb" />
              <span className="hill hill-one" />
              <span className="hill hill-two" />
              <span className="tree tree-one" />
              <span className="tree tree-two" />
            </div>
            <p className="step-label">Built for family decisions</p>
            <h3>Useful without knowing who you are.</h3>
            <ul>
              <li><Check size={17} /> No accounts or children&apos;s names</li>
              <li><Check size={17} /> GPS is optional and never stored</li>
              <li><Check size={17} /> Visit notes stay on this device</li>
            </ul>
          </aside>
        </div>
      </section>

      {showResults && (
        <section id="results" className="results-section" aria-live="polite">
          <div className="results-heading">
            <div>
              <p className="step-label">
                {criteria.mode === 'explore'
                  ? `${recommendations.length} places in range`
                  : recommendations.length
                    ? 'Your best matches'
                    : 'No honest match yet'}
              </p>
              <h2>
                {recommendations.length
                  ? criteria.mode === 'explore'
                    ? 'Explore the collection'
                    : noNearbyVerifiedMatch
                      ? `Verified matches, but none are near ${criteria.originLabel}`
                    : recommendations.length === 3
                      ? `Three verified choices from ${criteria.originLabel}`
                      : `${recommendations.length} honest ${recommendations.length === 1 ? 'choice' : 'choices'} from ${criteria.originLabel}`
                  : 'Keep your essentials, widen the search'}
              </h2>
            </div>
            <div className="weather-pill">
              <CloudSun size={19} />
              {weatherStatus === 'loading' && 'Checking today’s weather…'}
              {weatherStatus === 'unavailable' && 'Weather unavailable, ranking still works'}
              {weatherStatus === 'ready' && weather && (
                <span>
                  {Math.round(weather.temperatureC)}° max · {weather.precipitationProbability}% rain
                </span>
              )}
              {weatherStatus === 'idle' && 'Weather applies after search'}
            </div>
          </div>

          {criteria.mode === 'explore' && (
            <div className="sort-row" aria-label="Sort playgrounds">
              {([
                ['best', 'Best match'],
                ['nearest', 'Nearest'],
                ['new', 'New to us'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={sort === key}
                  className={sort === key ? 'sort-button active' : 'sort-button'}
                  onClick={() => setSort(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {noNearbyVerifiedMatch && (
            <div className="distance-alert" role="status">
              <Car size={20} />
              <div>
                <strong>No fully verified local match</strong>
                <span>The nearest confirmed option is {Math.min(...recommendations.map((item) => item.distanceKm))} km away. Closer places with incomplete evidence are shown below.</span>
              </div>
            </div>
          )}

          {recommendations.length === 0 ? (
            <div className="empty-state">
              <MapIcon size={42} />
              <h3>
                No place within {criteria.travelLimitMode === 'drive-time'
                  ? `the rough ${criteria.maxDriveMinutes}-minute search area`
                  : `${criteria.radiusKm} km`} confirms every essential.
              </h3>
              <p>
                Nearby places may still exist, but unknown facilities are never treated as confirmed. Review the evidence gaps below or remove {criteria.essentials.length > 0
                  ? facilityLabel(criteria.essentials[0]).toLowerCase()
                  : 'one requirement'}.
              </p>
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setCriteria((current) => ({
                    ...current,
                    radiusKm:
                      current.travelLimitMode === 'distance' && current.radiusKm < 25
                        ? 25
                        : current.radiusKm,
                    maxDriveMinutes:
                      current.travelLimitMode === 'drive-time' && current.maxDriveMinutes < 30
                        ? 30
                        : current.maxDriveMinutes,
                    essentials:
                      (current.travelLimitMode === 'distance' && current.radiusKm < 25) ||
                      (current.travelLimitMode === 'drive-time' && current.maxDriveMinutes < 30)
                        ? current.essentials
                        : current.essentials.slice(1),
                  }))
                }
              >
                {(criteria.travelLimitMode === 'distance' && criteria.radiusKm < 25) ||
                (criteria.travelLimitMode === 'drive-time' && criteria.maxDriveMinutes < 30)
                  ? criteria.travelLimitMode === 'drive-time'
                    ? 'Expand rough area to 30 min'
                    : 'Expand to 25 km'
                  : `Remove ${criteria.essentials.length > 0 ? facilityLabel(criteria.essentials[0]) : 'one requirement'}`}
              </button>
            </div>
          ) : (
            <div className="results-grid">
              <div className="result-list">
                {recommendations.map((item, index) => (
                  <ResultCard
                    key={item.playground.id}
                    item={item}
                    rank={index + 1}
                    selected={selectedId === item.playground.id}
                    favorite={favorites.includes(item.playground.id)}
                    narration={narration[item.playground.id]}
                    latestMemory={memories.find(
                      (memory) => memory.playgroundId === item.playground.id,
                    )}
                    onSelect={() => setSelectedId(item.playground.id)}
                    onFavorite={() => toggleFavorite(item.playground.id)}
                    onDetails={() => openDetail(item.playground)}
                    onNote={() => setNotePark(item.playground)}
                  />
                ))}
                {criteria.mode !== 'explore' && recommendations.length < 3 && (
                  <div className="limit-note">
                    <Info size={18} />
                    Only {recommendations.length} place{recommendations.length === 1 ? '' : 's'} confirmed every essential. Optional preferences were used only for ranking.
                  </div>
                )}
              </div>
              <div className="map-column">
                <ParkMap
                  recommendations={recommendations}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>
          )}


          {criteria.mode !== 'explore' && nearbyVerificationGaps.length > 0 && (
            <section className="nearby-evidence" aria-labelledby="nearby-evidence-title">
              <div>
                <p className="step-label">Nearby alternatives need checking</p>
                <h3 id="nearby-evidence-title">Nearby, but not a confirmed match yet</h3>
                <p>These nearby places have no known conflict with your essentials, but one or more required facilities still need a reliable source.</p>
              </div>
              <div className="nearby-evidence-grid">
                {nearbyVerificationGaps.map((item) => (
                  <article key={item.playground.id}>
                    <span className="suburb-label">{item.playground.suburb} · {item.distanceKm} km · roughly {item.estimatedDriveMinutesMin}–{item.estimatedDriveMinutesMax} min</span>
                    <h4>{item.playground.name}</h4>
                    {item.confirmedEssentials.length > 0 && (
                      <p className="confirmed-line"><Check size={15} /> Confirmed: {item.confirmedEssentials.map(facilityLabel).join(', ')}</p>
                    )}
                    <p className="missing-line"><Info size={15} /> Needs checking: {item.missingEssentials.map(facilityLabel).join(', ')}</p>
                    <button type="button" className="text-button" onClick={() => openDetail(item.playground)}>
                      Review evidence <ChevronRight size={17} />
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}
        </section>
      )}

      <section className="method-section">
        <div>
          <p className="step-label">Why trust the shortlist?</p>
          <h2>Every “yes” needs evidence.</h2>
        </div>
        <div className="method-grid">
          <article><BarChart3 /><h3>Mixed-age scoring</h3><p>The least-served child carries extra weight, so one child is never averaged away.</p></article>
          <article><ShieldCheck /><h3>Honest unknowns</h3><p>Unconfirmed facilities never pass a must-have filter.</p></article>
          <article><Heart /><h3>Private memory</h3><p>Your experience adjusts future rankings on this device only.</p></article>
        </div>
      </section>

      <footer>
        <strong>PlayPlan Perth</strong>
        <span>A growing 100+ place showcase, not a complete Perth directory. Always check official details before you go.</span>
        <span>
          Suburbs: <a href={suburbDataSource.url} target="_blank" rel="noreferrer">Geoscape, CC BY 4.0</a> · Playground discovery: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a> · Weather: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a> · Satellite map: <a href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9" target="_blank" rel="noreferrer">Esri World Imagery</a> · <a href="https://github.com/VVorotilov-AI-AU/playplan-perth/blob/main/LICENSE" target="_blank" rel="noreferrer">MIT licence</a>
        </span>
      </footer>

      {detailPark && (
        <DetailPanel
          park={detailPark}
          favorite={favorites.includes(detailPark.id)}
          onClose={closeDetail}
          onFavorite={() => toggleFavorite(detailPark.id)}
          onNote={() => {
            setNotePark(detailPark);
            setDetailPark(null);
          }}
        />
      )}

      {notePark && (
        <VisitDialog
          park={notePark}
          tags={noteTags}
          note={noteText}
          context={noteContext}
          onTags={setNoteTags}
          onNote={setNoteText}
          onContext={setNoteContext}
          onClose={() => {
            setNotePark(null);
            setNoteContext(undefined);
          }}
          onSave={saveVisit}
        />
      )}
      <div className="save-confirmation" role="status" aria-live="polite">
        {saveConfirmation}
      </div>
    </main>
  );
}

interface ResultCardProps {
  item: Recommendation;
  rank: number;
  selected: boolean;
  favorite: boolean;
  narration?: string;
  latestMemory?: VisitMemory;
  onSelect: () => void;
  onFavorite: () => void;
  onDetails: () => void;
  onNote: () => void;
}

function ResultCard({
  item,
  rank,
  selected,
  favorite,
  narration,
  latestMemory,
  onSelect,
  onFavorite,
  onDetails,
  onNote,
}: ResultCardProps) {
  const park = item.playground;
  return (
    <article
      className={selected ? 'result-card selected' : 'result-card'}
      onMouseEnter={onSelect}
    >
      <div className="result-topline">
        <span className="rank-badge">{rank}</span>
        <span className="match-score">{item.score}% match</span>
        <button
          type="button"
          className="icon-button"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={favorite}
          onClick={onFavorite}
        >
          <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="suburb-label">{park.suburb} · {item.distanceKm} km · roughly {item.estimatedDriveMinutesMin}–{item.estimatedDriveMinutesMax} min</p>
      <span className={`verification-badge ${park.verificationMethod === 'ai-assisted-source-review' ? 'ai' : 'manual'}`}>
        <ShieldCheck size={14} />
        {park.verificationMethod === 'ai-assisted-source-review'
          ? 'AI source-checked'
          : 'Facilities source-reviewed'}
      </span>
      <h3>{park.name}</h3>
      <p className="result-explanation">{narration ?? item.reasons.join('. ')} </p>
      <div className="feature-row">
        {park.standoutFeatures.slice(0, 3).map((feature) => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
      {item.tradeoffs.length > 0 && (
        <div className="tradeoff">
          <Info size={16} />
          <span>{item.tradeoffs[0]}</span>
        </div>
      )}
      {item.evidenceWarning && <p className="evidence-warning">{item.evidenceWarning}</p>}
      {latestMemory && (
        <div className="memory-recall">
          <strong>Your last visit</strong>
          <span>
            {latestMemory.context
              ? visitContextOptions.find((item) => item.key === latestMemory.context)?.label
              : new Date(latestMemory.visitedAt).toLocaleDateString('en-AU')}
            {' · '}
            {latestMemory.tags.slice(0, 3).map((tag) => visitTagLabels[tag]).join(', ')}
          </span>
          {latestMemory.note && <p>{latestMemory.note}</p>}
        </div>
      )}
      <div className="card-actions">
        <button type="button" className="text-button" onClick={onDetails}>
          Why this fits <ChevronRight size={17} />
        </button>
        <a
          className="maps-button"
          href={park.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Navigation size={17} /> Google Maps
        </a>
        <button type="button" className="note-button" onClick={onNote}>
          <Star size={17} /> Add visit note
        </button>
      </div>
    </article>
  );
}

function DetailPanel({
  park,
  favorite,
  onClose,
  onFavorite,
  onNote,
}: {
  park: Playground;
  favorite: boolean;
  onClose: () => void;
  onFavorite: () => void;
  onNote: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return (
    <div className="overlay" role="presentation" onMouseDown={onClose}>
      <aside
        className="detail-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="panel-heading">
          <button ref={closeButton} type="button" className="icon-button" onClick={onClose} aria-label="Close details">
            <ArrowLeft size={22} />
          </button>
          <button type="button" className="icon-button" onClick={onFavorite} aria-label="Toggle favorite">
            <Heart size={21} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        <p className="step-label">{park.suburb} · {park.council}</p>
        <h2 id="detail-title">{park.name}</h2>
        <p className="detail-address"><MapPin size={17} /> {park.address}</p>
        <p className={`verification-summary ${park.verificationMethod === 'ai-assisted-source-review' ? 'ai' : 'manual'}`}>
          <ShieldCheck size={18} />
          {park.verificationMethod === 'ai-assisted-source-review'
            ? 'AI matched this playground to its location and source. Only facts named in the linked evidence are confirmed; all other facilities and age details remain unknown.'
            : 'Facilities and age suitability were reviewed against the linked sources.'}
        </p>
        <div className="detail-section">
          <h3>What makes it stand out</h3>
          <ul className="feature-list">
            {park.standoutFeatures.map((feature) => (
              <li key={feature}><Sparkles size={17} /> {feature}</li>
            ))}
          </ul>
        </div>
        <div className="detail-section">
          <h3>Confirmed facilities</h3>
          <div className="facility-table">
            {facilityOptions.map(({ key, label }) => (
              <div key={key}>
                <span>{label}</span>
                <strong className={`state-${park.facilities[key]}`}>
                  {park.facilities[key] === 'yes'
                    ? 'Confirmed'
                    : park.facilities[key] === 'no'
                      ? 'No'
                      : 'Unknown'}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <div className="detail-section evidence-box">
          <h3>Evidence</h3>
          {park.evidence.map((item) => (
            <a key={item.sourceUrl} href={item.sourceUrl} target="_blank" rel="noreferrer">
              <ShieldCheck size={18} />
              <span>
                <strong>{item.sourceTitle}</strong>
                Checked {new Date(item.verifiedAt).toLocaleDateString('en-AU')}
              </span>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
        <div className="panel-actions">
          <a className="primary-button" href={park.googleMapsUrl} target="_blank" rel="noreferrer">
            <Navigation size={19} /> Open in Google Maps
          </a>
          <button type="button" className="secondary-button" onClick={onNote}>
            <Star size={18} /> Add visit note
          </button>
        </div>
      </aside>
    </div>
  );
}

function VisitDialog({
  park,
  tags,
  note,
  context,
  onTags,
  onNote,
  onContext,
  onClose,
  onSave,
}: {
  park: Playground;
  tags: VisitTag[];
  note: string;
  context?: VisitContext;
  onTags: (tags: VisitTag[]) => void;
  onNote: (note: string) => void;
  onContext: (context: VisitContext) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  function toggle(tag: VisitTag) {
    onTags(tags.includes(tag) ? tags.filter((item) => item !== tag) : [...tags, tag]);
  }
  return (
    <div className="overlay centered" role="presentation" onMouseDown={onClose}>
      <section
        className="note-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeButton} type="button" className="close-button" onClick={onClose} aria-label="Close note dialog">
          <X size={21} />
        </button>
        <p className="step-label">Private visit memory</p>
        <h2 id="note-title">How was {park.name}?</h2>
        <p>This stays on this device. Context makes feedback more useful than a star rating.</p>
        <fieldset className="visit-context">
          <legend><Clock3 size={17} /> When did this feel true? <span>Optional</span></legend>
          <div className="visit-tag-grid">
            {visitContextOptions.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={context === item.key}
                className={context === item.key ? 'visit-tag active' : 'visit-tag'}
                onClick={() => onContext(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        {visitGroups.map((group) => (
          <fieldset className="visit-context" key={group.label}>
            <legend>{group.label}</legend>
            <div className="visit-tag-grid">
              {group.options.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={tags.includes(key)}
                  className={tags.includes(key) ? 'visit-tag active' : 'visit-tag'}
                  onClick={() => toggle(key)}
                >
                  {key === 'easy-parking' || key === 'parking-difficult' ? <Car size={15} /> : null}
                  {tags.includes(key) && <Check size={15} />}
                  {visitTagLabels[key]}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
        <label className="note-field">
          Optional note
          <textarea
            value={note}
            maxLength={280}
            rows={4}
            placeholder="The toddler area was great, but arrive before 10…"
            onChange={(event) => onNote(event.target.value)}
          />
          <span>{note.length}/280</span>
        </label>
        <button type="button" className="primary-button" onClick={onSave} disabled={tags.length === 0}>
          <Heart size={19} /> Save private note
        </button>
      </section>
    </div>
  );
}

export default App;
