interface GoogleMapsPlace {
  name: string;
  address: string;
  suburb: string;
}

export function buildGoogleMapsPlaceUrl(place: GoogleMapsPlace): string {
  const params = new URLSearchParams({
    api: '1',
    query: `${place.name}, ${place.address}, ${place.suburb}, Western Australia`,
    utm_source: 'playplan_perth',
    utm_campaign: 'place_details_search',
  });
  return `https://www.google.com/maps/search/?${params.toString()}`;
}
