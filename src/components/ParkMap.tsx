import L from 'leaflet';
import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import type { Recommendation } from '../types';
import 'leaflet/dist/leaflet.css';

const tileUrl =
  import.meta.env.VITE_OSM_TILE_URL ??
  'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

function markerIcon(rank: number, selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<span class="map-pin ${selected ? 'map-pin--selected' : ''}"><b>${rank}</b></span>`,
    iconAnchor: [18, 40],
    popupAnchor: [0, -38],
    iconSize: [36, 40],
  });
}

function FitResults({
  recommendations,
}: {
  recommendations: Recommendation[];
}) {
  const map = useMap();
  useEffect(() => {
    if (!recommendations.length) return;
    const bounds = L.latLngBounds(
      recommendations.map((item) => [
        item.playground.coordinates.lat,
        item.playground.coordinates.lng,
      ]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
  }, [map, recommendations]);
  return null;
}

interface ParkMapProps {
  recommendations: Recommendation[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export function ParkMap({
  recommendations,
  selectedId,
  onSelect,
}: ParkMapProps) {
  return (
    <div className="map-shell" aria-label="Map of matching playgrounds">
      <MapContainer
        center={[-31.9523, 115.8613]}
        zoom={10}
        scrollWheelZoom
        className="h-full min-h-[340px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          url={tileUrl}
        />
        <FitResults recommendations={recommendations} />
        {recommendations.map((item, index) => (
          <Marker
            key={item.playground.id}
            position={[
              item.playground.coordinates.lat,
              item.playground.coordinates.lng,
            ]}
            icon={markerIcon(index + 1, selectedId === item.playground.id)}
            eventHandlers={{ click: () => onSelect(item.playground.id) }}
          >
            <Popup>
              <strong>{item.playground.name}</strong>
              <br />
              {item.distanceKm} km away · ~{item.estimatedDriveMinutes} min drive · {item.score}% match
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <a
        className="map-report"
        href="https://www.openstreetmap.org/fixthemap"
        target="_blank"
        rel="noreferrer"
      >
        Report a map issue
      </a>
    </div>
  );
}
