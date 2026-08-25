# PlayPlan Perth

PlayPlan Perth is an installable mobile web app that helps families choose among a curated selection of Perth playgrounds. It ranks places deterministically from children’s ages, location, hard facility requirements, preferences, current weather and private visit memory.

## What it does

- **Go today:** three explainable recommendations in under a minute.
- **Plan a party:** hard filters for confirmed BBQs, shelter, toilets, seating and lawn.
- **Explore Perth:** browse, filter, favorite and revisit a 39-place collection.
- **Metropolitan suburb search:** type-ahead search across 373 Perth suburbs, derived from the August 2026 Geoscape boundaries dataset.
- **Two travel limits:** filter by straight-line kilometres or a clearly labelled approximate drive time without live traffic.
- **Private by design:** no accounts, names, birthdays, addresses or stored GPS coordinates.
- **Contextual visit memory:** records supervision, toddler fit, crowd, heat, parking and practical arrival notes with optional time context.
- **Resilient:** ranking continues without weather, map tiles or AI.

Facilities use `yes`, `no` or `unknown`. Unknown never satisfies a must-have. BBQ means a facility is present, not that it is free when you arrive.

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
# or run the complete gate
npm run check
```

## Architecture

React, TypeScript and Vite provide the static app. React Leaflet renders OpenStreetMap tiles. Zod validates the bundled dataset at build/test time. Open-Meteo is optional and times out after two seconds. Visit notes and favorites stay in browser storage. The service worker precaches the versioned app bundle, never map tiles.

`AI_EXPLANATIONS` is deliberately disabled. The narrator adapter can later call a protected serverless service with sanitized criteria and ranked candidate IDs, but it cannot change the facts or ranking.

## Data and limits

This is a non-commercial showcase with a source-reviewed, curated selection, not a complete directory. Destination details change. Every detail panel links to the official source and shows the verification date. Always check before leaving.

See [DATA_SOURCES.md](DATA_SOURCES.md) and [PRIVACY.md](PRIVACY.md).
The [Perth parent feedback plan](docs/research/perth-parent-feedback-2026-08-25.md) explains which community signals are useful and how to collect them without scraping private groups.
