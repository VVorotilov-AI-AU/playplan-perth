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
  import.meta.env.VITE_SATELLITE_TILE_URL ??
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

const tileAttribution =
  import.meta.env.VITE_SATELLITE_ATTRIBUTION ??
  '&copy; Esri, Vantor, Earthstar Geographics, and the GIS User Community';

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
          attribution={tileAttribution}
          url={tileUrl}
          maxZoom={19}
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
              <br />
              <a href={item.playground.googleMapsUrl} target="_blank" rel="noreferrer">
                Open place details in Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <a
        className="map-report"
        href="https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9"
        target="_blank"
        rel="noreferrer"
      >
        Satellite imagery details
      </a>
    </div>
  );
}
