import type { Coordinates } from '../types';

export interface Suburb {
  name: string;
  coordinates: Coordinates;
}

export const suburbs: Suburb[] = [
  { name: 'Perth CBD', coordinates: { lat: -31.9523, lng: 115.8613 } },
  { name: 'Applecross', coordinates: { lat: -32.015, lng: 115.835 } },
  { name: 'Armadale', coordinates: { lat: -32.151, lng: 116.014 } },
  { name: 'Baldivis', coordinates: { lat: -32.33, lng: 115.82 } },
  { name: 'Bassendean', coordinates: { lat: -31.905, lng: 115.95 } },
  { name: 'Bayswater', coordinates: { lat: -31.918, lng: 115.913 } },
  { name: 'Belmont', coordinates: { lat: -31.944, lng: 115.926 } },
  { name: 'Bibra Lake', coordinates: { lat: -32.097, lng: 115.819 } },
  { name: 'Booragoon', coordinates: { lat: -32.038, lng: 115.833 } },
  { name: 'Canning Vale', coordinates: { lat: -32.063, lng: 115.918 } },
  { name: 'Cockburn Central', coordinates: { lat: -32.126, lng: 115.858 } },
  { name: 'Cottesloe', coordinates: { lat: -31.995, lng: 115.758 } },
  { name: 'East Perth', coordinates: { lat: -31.953, lng: 115.878 } },
  { name: 'Fremantle', coordinates: { lat: -32.056, lng: 115.744 } },
  { name: 'Gosnells', coordinates: { lat: -32.075, lng: 116.005 } },
  { name: 'Harrisdale', coordinates: { lat: -32.123, lng: 115.934 } },
  { name: 'Hillarys', coordinates: { lat: -31.806, lng: 115.741 } },
  { name: 'Joondalup', coordinates: { lat: -31.745, lng: 115.766 } },
  { name: 'Kalamunda', coordinates: { lat: -31.973, lng: 116.059 } },
  { name: 'Kings Park', coordinates: { lat: -31.961, lng: 115.833 } },
  { name: 'Kwinana', coordinates: { lat: -32.244, lng: 115.814 } },
  { name: 'Maylands', coordinates: { lat: -31.93, lng: 115.894 } },
  { name: 'Melville', coordinates: { lat: -32.04, lng: 115.801 } },
  { name: 'Midland', coordinates: { lat: -31.888, lng: 116.01 } },
  { name: 'Morley', coordinates: { lat: -31.89, lng: 115.9 } },
  { name: 'Mount Lawley', coordinates: { lat: -31.934, lng: 115.872 } },
  { name: 'Rockingham', coordinates: { lat: -32.276, lng: 115.73 } },
  { name: 'Scarborough', coordinates: { lat: -31.895, lng: 115.76 } },
  { name: 'South Perth', coordinates: { lat: -31.98, lng: 115.861 } },
  { name: 'Subiaco', coordinates: { lat: -31.949, lng: 115.824 } },
  { name: 'Victoria Park', coordinates: { lat: -31.976, lng: 115.9 } },
  { name: 'Wanneroo', coordinates: { lat: -31.75, lng: 115.805 } },
  { name: 'West Perth', coordinates: { lat: -31.95, lng: 115.843 } },
  { name: 'Winthrop', coordinates: { lat: -32.052, lng: 115.831 } },
];
