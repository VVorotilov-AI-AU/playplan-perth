# Data sources and evidence policy

The bundled playground collection is manually curated from official council, WA Government and park-operator pages. Nature Play WA may be used to discover candidates, but a discovery listing alone is not accepted as facility evidence.

Each record stores an official source URL and title, supported fields, date checked, confidence and check-before-visit status, plus tri-state facility values: `yes`, `no` and `unknown`.

The build fails for missing identifiers, invalid Perth coordinates, missing age bands, missing evidence or invalid Google Maps links. Unknown facilities do not pass hard filters. The app never copies third-party reviews or destination photos.

The collection was checked on 25 August 2026. Official pages remain authoritative because facilities, maintenance and opening conditions can change.

## Suburb search origins

The searchable origin catalogue is derived from the August 2026 [Geoscape WA Suburb/Locality Boundaries](https://data.gov.au/data/dataset/wa-suburb-locality-boundaries-geoscape-administrative-boundaries), licensed under CC BY 4.0. It is limited to localities intersecting the 30 local government areas of the Perth Metropolitan Region. Coordinates are representative locality points used only for local distance calculations, not home addresses.

Drive time is a deterministic local estimate derived from straight-line distance, a route factor and a short access allowance. It excludes live routing and traffic. Google Maps remains the source for the actual route.

## Map presentation and place links

The embedded result map uses [Esri World Imagery](https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9). Provider attribution remains visible on the map, and imagery tiles are never prefetched or stored for offline use.

Google Maps buttons use the official Maps URL search format with each playground's name and full address. This opens Google's place details when Google can resolve the listing, while keeping photos, reviews and routing on Google. No Google content is copied into the application.
