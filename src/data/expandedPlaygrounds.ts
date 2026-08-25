import type { Activity, AgeBand, Playground } from '../types';

export interface AiReviewedPlaygroundSeed {
  id: string;
  name: string;
  suburb: string;
  council: string;
  lat: number;
  lng: number;
  osmUrl: string;
  officialSourceUrl: string;
  officialSourceTitle: string;
  ages?: AgeBand[];
  activities?: Activity[];
  facilities?: Partial<Playground['facilities']>;
  confirmedFields?: string[];
  features?: string[];
  cautions?: string[];
}

interface CouncilSource {
  url: string;
  title: string;
}

const sources = {
  joondalup: {
    url: 'https://www.joondalup.wa.gov.au/community-and-spaces/facilities%2C-venues-and-parks/parks-and-playgrounds',
    title: 'City of Joondalup, parks and playgrounds',
  },
  wanneroo: {
    url: 'https://www.wanneroo.wa.gov.au/parks',
    title: 'City of Wanneroo, parks',
  },
  southPerth: {
    url: 'https://southperth.wa.gov.au/discover/things-to-see-and-do/parks-reserves',
    title: 'City of South Perth, parks and reserves',
  },
  vincent: {
    url: 'https://www.vincent.wa.gov.au/parks-and-facilities/',
    title: 'City of Vincent, parks and facilities',
  },
  cockburn: {
    url: 'https://www.cockburn.wa.gov.au/Adventure-and-Leisure/Nature-and-Outdoors/Parks-and-Playgrounds/Playgrounds',
    title: 'City of Cockburn, playgrounds',
  },
  claremont: {
    url: 'https://www.claremont.wa.gov.au/environment/parks/',
    title: 'Town of Claremont, parks',
  },
  victoriaPark: {
    url: 'https://www.victoriapark.wa.gov.au/parks-and-reserves',
    title: 'Town of Victoria Park, parks and reserves',
  },
  swan: {
    url: 'https://www.swan.wa.gov.au/explore-and-do/parks-venues-and-facilities',
    title: 'City of Swan, parks and reserves',
  },
  gosnells: {
    url: 'https://www.gosnells.wa.gov.au/Leisure-and-Community/Parks-and-outdoor-spaces/Find-a-park-or-outdoor-space',
    title: 'City of Gosnells, parks and outdoor spaces',
  },
  nedlands: {
    url: 'https://www.nedlands.wa.gov.au/documents/518/city-of-nedlands-parks-and-reserves',
    title: 'City of Nedlands, parks and reserves facilities',
  },
  belmont: {
    url: 'https://www.belmont.wa.gov.au/discover/places-to-go/parks-and-playgrounds/our-playgrounds',
    title: 'City of Belmont, playground directory',
  },
  kingsPark: {
    url: 'https://www.bgpa.wa.gov.au/kings-park/attraction/rio-tinto-naturescape-kings-park',
    title: 'Botanic Gardens and Parks Authority, Rio Tinto Naturescape',
  },
  stirling: {
    url: 'https://www.stirling.wa.gov.au/attractions-and-recreation/parks,-beaches-and-playgrounds/parks-and-playgrounds',
    title: 'City of Stirling, parks and reserves',
  },
  kwinana: {
    url: 'https://www.kwinana.wa.gov.au/city-life/things-to-do/parks-and-playgrounds',
    title: 'City of Kwinana, parks and playgrounds',
  },
  canning: {
    url: 'https://www.canning.wa.gov.au/recreation-and-community/parks-and-reserves/',
    title: 'City of Canning, parks and reserves',
  },
  kalamunda: {
    url: 'https://www.kalamunda.wa.gov.au/our-city/environment/public-reserve-management',
    title: 'City of Kalamunda, parks and reserves',
  },
  mosmanPark: {
    url: 'https://www.mosmanpark.wa.gov.au/live/my-environment/my-parks/',
    title: 'Town of Mosman Park, parks and reserves',
  },
  armadale: {
    url: 'https://my.armadale.wa.gov.au/service/environment-and-sustainability/public-open-spaces/parks-playgrounds-and-reserves/',
    title: 'City of Armadale, parks, playgrounds and reserves',
  },
  fremantle: {
    url: 'https://mysay.fremantle.wa.gov.au/ks-playspace',
    title: 'City of Fremantle, Walyalup Koort Play Space',
  },
  perth: {
    url: 'https://perth.wa.gov.au/hire-and-bookings/all-venues/russell-square',
    title: 'City of Perth, Russell Square',
  },
  rockingham: {
    url: 'https://rockingham.wa.gov.au/facilities-and-recreation/find-a-venue-park-or-reserve',
    title: 'City of Rockingham, parks and reserves directory',
  },
} satisfies Record<string, CouncilSource>;

type SourceKey = keyof typeof sources;
type SeedRow = readonly [
  id: string,
  name: string,
  suburb: string,
  council: string,
  lat: number,
  lng: number,
  osmType: 'node' | 'way',
  osmId: number,
  source: SourceKey,
];

const rows: SeedRow[] = [
  ['batavia-playground', 'Batavia Playground', 'Kallaroo', 'City of Joondalup', -31.791039, 115.7513282, 'node', 546390812, 'joondalup'],
  ['faversham-park-playground', 'Faversham Park Public Playground', 'Edgewater', 'City of Joondalup', -31.7690345, 115.774682, 'node', 597287372, 'joondalup'],
  ['alvarez-park', 'Alvarez Park', 'Tapping', 'City of Wanneroo', -31.7176107, 115.7972154, 'node', 1332955433, 'wanneroo'],
  ['eiffel-park', 'Eiffel Park', 'Tapping', 'City of Wanneroo', -31.7194494, 115.8003076, 'node', 1332955559, 'wanneroo'],
  ['bill-mcgrath-reserve', 'Bill McGrath Reserve', 'Kensington', 'City of South Perth', -31.981858, 115.8858916, 'node', 1771255069, 'southPerth'],
  ['morris-mundy-reserve', 'Morris Mundy Reserve', 'Kensington', 'City of South Perth', -31.9832777, 115.8805272, 'node', 1771255071, 'southPerth'],
  ['cabrini-park-playground', 'Cabrini Park Playground', 'Marangaroo', 'City of Wanneroo', -31.8302922, 115.8242444, 'node', 1860278584, 'wanneroo'],
  ['templeton-park-playground', 'Templeton Park Playground', 'Warwick', 'City of Joondalup', -31.837917, 115.8233698, 'node', 1860279309, 'joondalup'],
  ['liddell-park-playground', 'Liddell Park Playground', 'Warwick', 'City of Joondalup', -31.840829, 115.8234075, 'node', 1860279395, 'joondalup'],
  ['blackmore-park-playground', 'Blackmore Park Playground', 'Girrawheen', 'City of Wanneroo', -31.841091, 115.8306119, 'node', 1860284008, 'wanneroo'],
  ['leederville-playground', 'Leederville Playground', 'Leederville', 'City of Vincent', -31.938699, 115.8415017, 'node', 1860290455, 'vincent'],
  ['variety-special-playground', 'The Variety Special Playground', 'South Perth', 'City of South Perth', -31.9757801, 115.8540761, 'node', 2487994132, 'southPerth'],
  ['dwayne-favazzo-playground', 'Dwayne Favazzo Playground', 'Lake Coogee', 'City of Cockburn', -32.1184727, 115.779351, 'node', 3311649834, 'cockburn'],
  ['claremont-park-playground', 'Claremont Park Playground', 'Claremont', 'Town of Claremont', -31.9839154, 115.7830892, 'node', 4362432323, 'claremont'],
  ['mrs-herberts-playground', "Mrs Herbert's Playground", 'Claremont', 'Town of Claremont', -31.9910409, 115.7868373, 'node', 4362440027, 'claremont'],
  ['mackie-street-playground', 'Mackie Street Playground', 'Victoria Park', 'Town of Victoria Park', -31.9781691, 115.8863077, 'node', 4611578952, 'victoriaPark'],
  ['touched-by-olivia-playground', 'Touched By Olivia Playground', 'Brabham', 'City of Swan', -31.8209685, 115.9661646, 'node', 4636747289, 'swan'],
  ['duncan-reserve-playground', 'Duncan Reserve Playground', 'Victoria Park', 'Town of Victoria Park', -31.9726828, 115.9008856, 'node', 4655577961, 'victoriaPark'],
  ['chevron-parkland', 'Chevron Parkland', 'Burswood', 'Town of Victoria Park', -31.9502867, 115.8858032, 'node', 5745205588, 'victoriaPark'],
  ['brabham-jungle-park', 'Brabham Jungle Park', 'Brabham', 'City of Swan', -31.828319, 115.9687968, 'node', 7652724980, 'swan'],
  ['bellevue-train-park', 'Bellevue Train Park', 'Bellevue', 'City of Swan', -31.8999861, 116.0326839, 'node', 9217795675, 'swan'],
  ['mabel-davis-park-playground', 'Mabel Davis Park Playground', 'Thornlie', 'City of Gosnells', -32.0664805, 115.974036, 'node', 9908553116, 'gosnells'],
  ['blain-park-playground', 'Blain Park Playground', 'Dalkeith', 'City of Nedlands', -31.9978922, 115.7959213, 'node', 13355335601, 'nedlands'],
  ['landbeach-park', 'Landbeach Park', 'Butler', 'City of Wanneroo', -31.6270444, 115.7072916, 'node', 13382714023, 'wanneroo'],
  ['eden-beach-foreshore-playground', 'Eden Beach Foreshore Playground', 'Jindalee', 'City of Wanneroo', -31.637585, 115.6777237, 'node', 14007879261, 'wanneroo'],
  ['volcano-playground', 'Volcano Playground', 'Cloverdale', 'City of Belmont', -31.9603589, 115.9332716, 'way', 43380388, 'belmont'],
  ['rio-tinto-naturescape', 'Rio Tinto Naturescape Kings Park', 'Kings Park', 'Botanic Gardens and Parks Authority', -31.9574585, 115.8401146, 'way', 141311052, 'kingsPark'],
  ['whitfords-west-playpark', 'Whitfords West Playpark', 'Kallaroo', 'City of Joondalup', -31.7942412, 115.749327, 'way', 421586743, 'joondalup'],
  ['stirling-road-playground', 'Stirling Road Playground', 'Claremont', 'Town of Claremont', -31.9780486, 115.7774295, 'way', 438497947, 'claremont'],
  ['cresswell-park-playground', 'Cresswell Park Playground', 'Swanbourne', 'City of Nedlands', -31.9755046, 115.7719577, 'way', 439086756, 'nedlands'],
  ['james-cook-playground', 'James Cook Playground', 'Kallaroo', 'City of Joondalup', -31.7989817, 115.7514254, 'way', 468711134, 'joondalup'],
  ['edgewater-nature-play', 'Nature Play', 'Edgewater', 'City of Joondalup', -31.761893, 115.7798062, 'way', 478365125, 'joondalup'],
  ['plumdale-park-playground', 'Plumdale Park Playground', 'Woodvale', 'City of Joondalup', -31.7798214, 115.7855292, 'way', 516834182, 'joondalup'],
  ['fletcher-park-playground', 'Fletcher Park Playground', 'Carlisle', 'Town of Victoria Park', -31.9752351, 115.9180197, 'way', 583653176, 'victoriaPark'],
  ['norman-playground', 'Norman Playground', 'St James', 'Town of Victoria Park', -31.9967377, 115.9160474, 'way', 583731509, 'victoriaPark'],
  ['alday-street-reserve-playground', 'Alday Street Reserve Playground', 'St James', 'Town of Victoria Park', -31.9945342, 115.9107338, 'way', 586167878, 'victoriaPark'],
  ['stadium-playground', 'Stadium Playground', 'Burswood', 'VenuesLive', -31.9540454, 115.8878365, 'way', 641872416, 'victoriaPark'],
  ['fieldgate-reserve-playground', 'Fieldgate Reserve Playground', 'Hamersley', 'City of Stirling', -31.8476469, 115.8257693, 'way', 660661753, 'stirling'],
  ['hennessy-park', 'Hennessy Park', 'Orelia', 'City of Kwinana', -32.2370406, 115.8270212, 'way', 723283363, 'kwinana'],
  ['adenia-park-playground', 'Adenia Park Playground', 'Riverton', 'City of Canning', -32.0344469, 115.910354, 'way', 751769314, 'canning'],
  ['bannister-creek-nature-playground', 'Bannister Creek Nature Playground', 'Lynwood', 'City of Canning', -32.0432659, 115.9252322, 'way', 783216532, 'canning'],
  ['buxton-tandarra-reserve', 'Buxton Tandarra Reserve', 'Wembley Downs', 'City of Stirling', -31.9163722, 115.7696739, 'way', 800170904, 'stirling'],
  ['tillia-court-reserve-playground', 'Tillia Court Reserve Playground', 'Forrestfield', 'City of Kalamunda', -31.9877274, 115.9921269, 'way', 813383537, 'kalamunda'],
  ['nature-discovery-space', 'Nature Discovery Space', 'Mosman Park', 'Town of Mosman Park', -32.0145225, 115.7525209, 'way', 853698459, 'mosmanPark'],
  ['pitstop-playground', 'Pitstop Playground', 'Banksia Grove', 'City of Wanneroo', -31.6948948, 115.8009945, 'way', 968823599, 'wanneroo'],
  ['centennial-park-playground', 'Centennial Park Playground', 'Bertram', 'City of Kwinana', -32.2524682, 115.84441, 'way', 1017539791, 'kwinana'],
  ['warradale-park-playground', 'Warradale Park Playground', 'Landsdale', 'City of Wanneroo', -31.7998325, 115.8627757, 'way', 1094007301, 'wanneroo'],
  ['fancote-park-playground', 'Fancote Park Playground', 'Kelmscott', 'City of Armadale', -32.112258, 116.0162803, 'way', 1137128488, 'armadale'],
  ['walyalup-koort-playground', 'Walyalup Koort Playground', 'Fremantle', 'City of Fremantle', -32.0536539, 115.7486426, 'way', 1435864195, 'fremantle'],
  ['botany-park-playground', 'Botany Park Playground', 'Hammond Park', 'City of Cockburn', -32.1657053, 115.8473748, 'way', 1355585222, 'cockburn'],
  ['matron-olive-galliers-park', 'Matron Olive Galliers Park', 'Mount Nasura', 'City of Armadale', -32.1378699, 116.0151798, 'way', 1356682204, 'armadale'],
  ['kalari-park', 'Kalari Park', 'Wattle Grove', 'City of Kalamunda', -32.0031923, 115.9894692, 'way', 1416646982, 'kalamunda'],
  ['pages-park', 'Pages Park', 'Gosnells', 'City of Gosnells', -32.072333, 116.0041399, 'way', 1242196362, 'gosnells'],
  ['russell-square-playground', 'Russell Square Public Playground', 'Northbridge', 'City of Perth', -31.946706, 115.8547513, 'way', 1343457492, 'perth'],
  ['monticello-park-playground', 'Monticello Park Playground', 'Landsdale', 'City of Wanneroo', -31.811378, 115.871133, 'way', 1274579952, 'wanneroo'],
  ['thaxter-park-nature-playground', 'Thaxter Park Nature Playground', 'Landsdale', 'City of Wanneroo', -31.8064596, 115.8712966, 'way', 1274848961, 'wanneroo'],
  ['arduaine-park-playground', 'Arduaine Park Playground', 'Landsdale', 'City of Wanneroo', -31.8088253, 115.8739485, 'way', 1274848962, 'wanneroo'],
  ['donatello-park-playground', 'Donatello Park Playground', 'Landsdale', 'City of Wanneroo', -31.8137749, 115.8686566, 'way', 1274904717, 'wanneroo'],
  ['fragola-park-playground', 'Fragola Park Playground', 'Landsdale', 'City of Wanneroo', -31.8140237, 115.8716592, 'way', 1274904718, 'wanneroo'],
  ['dinosaur-playground', 'Dinosaur Playground', 'Madeley', 'City of Wanneroo', -31.8158698, 115.8308242, 'way', 1276331019, 'wanneroo'],
  ['st-clair-playground', 'St Clair Playground', 'Port Kennedy', 'City of Rockingham', -32.3505111, 115.7538767, 'node', 2099305920, 'rockingham'],
];

const reviewedOverrides: Record<string, Partial<AiReviewedPlaygroundSeed>> = {
  'volcano-playground': {
    activities: ['water-play', 'sensory-play', 'climbing'],
    facilities: { bbq: 'yes', toilets: 'yes', seating: 'yes' },
    confirmedFields: ['activities', 'facilities'],
    features: ['Water and sensory play', 'BBQs, toilets and picnic facilities'],
  },
  'rio-tinto-naturescape': {
    ages: ['4-6', '7-9', '10-12'],
    activities: ['nature-play', 'water-play', 'climbing'],
    facilities: { toilets: 'yes', accessibleEquipment: 'yes', shade: 'yes' },
    confirmedFields: ['ageBands', 'activities', 'facilities', 'seasonal opening'],
    features: ['Creeks, tree hides and aerial walkways', 'Seasonal supervised nature play'],
    cautions: ['Closed Mondays, all February and during specified severe weather conditions'],
  },
  'whitfords-west-playpark': {
    facilities: { bbq: 'yes' },
    confirmedFields: ['facilities.bbq'],
    features: ['BBQ confirmed by City of Joondalup', 'Local playground in Kallaroo'],
  },
  'hennessy-park': {
    facilities: { seating: 'yes', openLawn: 'yes' },
    confirmedFields: ['facilities'],
    features: ['Playground among established trees', 'Bench overlooking open grass'],
  },
  'walyalup-koort-playground': {
    ages: ['1-3', '4-6', '7-9'],
    activities: ['climbing', 'swings', 'slides', 'water-play', 'nature-play', 'sensory-play'],
    facilities: { accessibleEquipment: 'yes', shade: 'yes' },
    confirmedFields: ['ageBands', 'activities', 'facilities'],
    features: ['Accessible multi-age civic play space', 'Water, climbing and tactile nature play'],
  },
  'botany-park-playground': {
    facilities: { accessibleEquipment: 'yes' },
    confirmedFields: ['facilities.accessibleEquipment'],
    features: ['Inclusive and accessible play equipment', 'Local playground in Hammond Park'],
  },
  'dinosaur-playground': {
    ages: ['1-3', '4-6', '7-9', '10-12'],
    activities: ['nature-play', 'sensory-play', 'climbing', 'slides', 'swings', 'wheels'],
    facilities: { openLawn: 'yes' },
    confirmedFields: ['ageBands', 'activities', 'facilities.openLawn'],
    features: ['Climbable dinosaur and fossil sand play', 'Scooter path and grassed kick-about area'],
  },
};

export const aiReviewedPlaygroundSeeds: AiReviewedPlaygroundSeed[] = rows.map(
  ([id, name, suburb, council, lat, lng, osmType, osmId, sourceKey]) => ({
    id,
    name,
    suburb,
    council,
    lat,
    lng,
    osmUrl: `https://www.openstreetmap.org/${osmType}/${osmId}`,
    officialSourceUrl: sources[sourceKey].url,
    officialSourceTitle: sources[sourceKey].title,
    ...reviewedOverrides[id],
  }),
);
