import type { Coordinates } from '../types';

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

export const suburbs: Suburb[] = [
  {
    "name": "Alexander Heights",
    "coordinates": {
      "lat": -31.82758,
      "lng": 115.86509
    }
  },
  {
    "name": "Alfred Cove",
    "coordinates": {
      "lat": -32.03284,
      "lng": 115.81704
    }
  },
  {
    "name": "Alkimos",
    "coordinates": {
      "lat": -31.61473,
      "lng": 115.68356
    }
  },
  {
    "name": "Anketell",
    "coordinates": {
      "lat": -32.21859,
      "lng": 115.86553
    }
  },
  {
    "name": "Applecross",
    "coordinates": {
      "lat": -32.01369,
      "lng": 115.83667
    }
  },
  {
    "name": "Ardross",
    "coordinates": {
      "lat": -32.02711,
      "lng": 115.83553
    }
  },
  {
    "name": "Armadale",
    "coordinates": {
      "lat": -32.15112,
      "lng": 116.00691
    }
  },
  {
    "name": "Ascot",
    "coordinates": {
      "lat": -31.93411,
      "lng": 115.9294
    }
  },
  {
    "name": "Ashby",
    "coordinates": {
      "lat": -31.73255,
      "lng": 115.79768
    }
  },
  {
    "name": "Ashendon",
    "coordinates": {
      "lat": -32.21184,
      "lng": 116.18778
    }
  },
  {
    "name": "Ashfield",
    "coordinates": {
      "lat": -31.91734,
      "lng": 115.93809
    }
  },
  {
    "name": "Attadale",
    "coordinates": {
      "lat": -32.02533,
      "lng": 115.80236
    }
  },
  {
    "name": "Atwell",
    "coordinates": {
      "lat": -32.14344,
      "lng": 115.86519
    }
  },
  {
    "name": "Aubin Grove",
    "coordinates": {
      "lat": -32.16699,
      "lng": 115.86269
    }
  },
  {
    "name": "Aveley",
    "coordinates": {
      "lat": -31.78153,
      "lng": 115.98926
    }
  },
  {
    "name": "Avon Valley National Park",
    "coordinates": {
      "lat": -31.63605,
      "lng": 116.18874
    }
  },
  {
    "name": "Bailup",
    "coordinates": {
      "lat": -31.73912,
      "lng": 116.30988
    }
  },
  {
    "name": "Balcatta",
    "coordinates": {
      "lat": -31.87157,
      "lng": 115.81947
    }
  },
  {
    "name": "Baldivis",
    "coordinates": {
      "lat": -32.32899,
      "lng": 115.83066
    }
  },
  {
    "name": "Balga",
    "coordinates": {
      "lat": -31.85481,
      "lng": 115.83984
    }
  },
  {
    "name": "Ballajura",
    "coordinates": {
      "lat": -31.83998,
      "lng": 115.896
    }
  },
  {
    "name": "Banjup",
    "coordinates": {
      "lat": -32.15759,
      "lng": 115.88293
    }
  },
  {
    "name": "Banksia Grove",
    "coordinates": {
      "lat": -31.69625,
      "lng": 115.80543
    }
  },
  {
    "name": "Baskerville",
    "coordinates": {
      "lat": -31.79765,
      "lng": 116.04909
    }
  },
  {
    "name": "Bassendean",
    "coordinates": {
      "lat": -31.90629,
      "lng": 115.9453
    }
  },
  {
    "name": "Bateman",
    "coordinates": {
      "lat": -32.05553,
      "lng": 115.84726
    }
  },
  {
    "name": "Bayswater",
    "coordinates": {
      "lat": -31.91737,
      "lng": 115.91788
    }
  },
  {
    "name": "Beaconsfield",
    "coordinates": {
      "lat": -32.06937,
      "lng": 115.7686
    }
  },
  {
    "name": "Beckenham",
    "coordinates": {
      "lat": -32.02433,
      "lng": 115.96062
    }
  },
  {
    "name": "Bedford",
    "coordinates": {
      "lat": -31.90947,
      "lng": 115.89169
    }
  },
  {
    "name": "Bedfordale",
    "coordinates": {
      "lat": -32.17824,
      "lng": 116.06745
    }
  },
  {
    "name": "Beechboro",
    "coordinates": {
      "lat": -31.86825,
      "lng": 115.93825
    }
  },
  {
    "name": "Beechina",
    "coordinates": {
      "lat": -31.85557,
      "lng": 116.31631
    }
  },
  {
    "name": "Beeliar",
    "coordinates": {
      "lat": -32.14119,
      "lng": 115.82177
    }
  },
  {
    "name": "Beldon",
    "coordinates": {
      "lat": -31.77467,
      "lng": 115.76292
    }
  },
  {
    "name": "Belhus",
    "coordinates": {
      "lat": -31.78154,
      "lng": 116.00955
    }
  },
  {
    "name": "Bellevue",
    "coordinates": {
      "lat": -31.90132,
      "lng": 116.02713
    }
  },
  {
    "name": "Belmont",
    "coordinates": {
      "lat": -31.9498,
      "lng": 115.93127
    }
  },
  {
    "name": "Bennett Springs",
    "coordinates": {
      "lat": -31.85638,
      "lng": 115.94592
    }
  },
  {
    "name": "Bentley",
    "coordinates": {
      "lat": -32.00598,
      "lng": 115.90728
    }
  },
  {
    "name": "Bertram",
    "coordinates": {
      "lat": -32.24463,
      "lng": 115.84513
    }
  },
  {
    "name": "Bibra Lake",
    "coordinates": {
      "lat": -32.09927,
      "lng": 115.81852
    }
  },
  {
    "name": "Bickley",
    "coordinates": {
      "lat": -32.00118,
      "lng": 116.10217
    }
  },
  {
    "name": "Bicton",
    "coordinates": {
      "lat": -32.02651,
      "lng": 115.7859
    }
  },
  {
    "name": "Booragoon",
    "coordinates": {
      "lat": -32.03953,
      "lng": 115.83368
    }
  },
  {
    "name": "Boya",
    "coordinates": {
      "lat": -31.91765,
      "lng": 116.05725
    }
  },
  {
    "name": "Brabham",
    "coordinates": {
      "lat": -31.82793,
      "lng": 115.97339
    }
  },
  {
    "name": "Brentwood",
    "coordinates": {
      "lat": -32.04351,
      "lng": 115.85245
    }
  },
  {
    "name": "Brigadoon",
    "coordinates": {
      "lat": -31.77254,
      "lng": 116.07249
    }
  },
  {
    "name": "Brookdale",
    "coordinates": {
      "lat": -32.16697,
      "lng": 116.00197
    }
  },
  {
    "name": "Bull Creek",
    "coordinates": {
      "lat": -32.05623,
      "lng": 115.86247
    }
  },
  {
    "name": "Bullsbrook",
    "coordinates": {
      "lat": -31.66324,
      "lng": 116.0286
    }
  },
  {
    "name": "Burns Beach",
    "coordinates": {
      "lat": -31.72061,
      "lng": 115.7203
    }
  },
  {
    "name": "Burswood",
    "coordinates": {
      "lat": -31.95582,
      "lng": 115.89314
    }
  },
  {
    "name": "Bushmead",
    "coordinates": {
      "lat": -31.9282,
      "lng": 116.02996
    }
  },
  {
    "name": "Butler",
    "coordinates": {
      "lat": -31.64295,
      "lng": 115.70485
    }
  },
  {
    "name": "Byford",
    "coordinates": {
      "lat": -32.22476,
      "lng": 116.00219
    }
  },
  {
    "name": "Calista",
    "coordinates": {
      "lat": -32.24645,
      "lng": 115.80295
    }
  },
  {
    "name": "Camillo",
    "coordinates": {
      "lat": -32.11295,
      "lng": 116.00205
    }
  },
  {
    "name": "Canning Mills",
    "coordinates": {
      "lat": -32.05744,
      "lng": 116.09579
    }
  },
  {
    "name": "Canning Vale",
    "coordinates": {
      "lat": -32.08137,
      "lng": 115.91689
    }
  },
  {
    "name": "Cannington",
    "coordinates": {
      "lat": -32.016,
      "lng": 115.93676
    }
  },
  {
    "name": "Carabooda",
    "coordinates": {
      "lat": -31.59754,
      "lng": 115.72049
    }
  },
  {
    "name": "Cardup",
    "coordinates": {
      "lat": -32.25352,
      "lng": 115.98328
    }
  },
  {
    "name": "Carine",
    "coordinates": {
      "lat": -31.8521,
      "lng": 115.78247
    }
  },
  {
    "name": "Carlisle",
    "coordinates": {
      "lat": -31.97943,
      "lng": 115.91811
    }
  },
  {
    "name": "Carmel",
    "coordinates": {
      "lat": -32.0216,
      "lng": 116.0831
    }
  },
  {
    "name": "Carramar",
    "coordinates": {
      "lat": -31.69968,
      "lng": 115.78296
    }
  },
  {
    "name": "Casuarina",
    "coordinates": {
      "lat": -32.24133,
      "lng": 115.86961
    }
  },
  {
    "name": "Caversham",
    "coordinates": {
      "lat": -31.87559,
      "lng": 115.97546
    }
  },
  {
    "name": "Champion Lakes",
    "coordinates": {
      "lat": -32.11896,
      "lng": 115.98633
    }
  },
  {
    "name": "Chidlow",
    "coordinates": {
      "lat": -31.8511,
      "lng": 116.27155
    }
  },
  {
    "name": "Churchlands",
    "coordinates": {
      "lat": -31.9216,
      "lng": 115.79295
    }
  },
  {
    "name": "City Beach",
    "coordinates": {
      "lat": -31.93533,
      "lng": 115.76528
    }
  },
  {
    "name": "Claremont",
    "coordinates": {
      "lat": -31.98109,
      "lng": 115.78212
    }
  },
  {
    "name": "Clarkson",
    "coordinates": {
      "lat": -31.6867,
      "lng": 115.72621
    }
  },
  {
    "name": "Cloverdale",
    "coordinates": {
      "lat": -31.96276,
      "lng": 115.94434
    }
  },
  {
    "name": "Cockburn Central",
    "coordinates": {
      "lat": -32.12127,
      "lng": 115.84779
    }
  },
  {
    "name": "Como",
    "coordinates": {
      "lat": -31.99969,
      "lng": 115.86767
    }
  },
  {
    "name": "Connolly",
    "coordinates": {
      "lat": -31.74853,
      "lng": 115.75072
    }
  },
  {
    "name": "Coogee",
    "coordinates": {
      "lat": -32.12234,
      "lng": 115.76535
    }
  },
  {
    "name": "Coolbellup",
    "coordinates": {
      "lat": -32.08123,
      "lng": 115.80609
    }
  },
  {
    "name": "Coolbinia",
    "coordinates": {
      "lat": -31.91385,
      "lng": 115.85386
    }
  },
  {
    "name": "Cooloongup",
    "coordinates": {
      "lat": -32.29552,
      "lng": 115.77679
    }
  },
  {
    "name": "Cottesloe",
    "coordinates": {
      "lat": -31.99447,
      "lng": 115.75804
    }
  },
  {
    "name": "Craigie",
    "coordinates": {
      "lat": -31.78731,
      "lng": 115.76957
    }
  },
  {
    "name": "Crawley",
    "coordinates": {
      "lat": -31.98343,
      "lng": 115.82716
    }
  },
  {
    "name": "Cullacabardee",
    "coordinates": {
      "lat": -31.81283,
      "lng": 115.8989
    }
  },
  {
    "name": "Currambine",
    "coordinates": {
      "lat": -31.73376,
      "lng": 115.7457
    }
  },
  {
    "name": "Daglish",
    "coordinates": {
      "lat": -31.95151,
      "lng": 115.80997
    }
  },
  {
    "name": "Dalkeith",
    "coordinates": {
      "lat": -31.99654,
      "lng": 115.7993
    }
  },
  {
    "name": "Darch",
    "coordinates": {
      "lat": -31.81253,
      "lng": 115.84575
    }
  },
  {
    "name": "Darling Downs",
    "coordinates": {
      "lat": -32.19485,
      "lng": 115.99012
    }
  },
  {
    "name": "Darlington",
    "coordinates": {
      "lat": -31.92479,
      "lng": 116.08061
    }
  },
  {
    "name": "Dayton",
    "coordinates": {
      "lat": -31.85453,
      "lng": 115.97404
    }
  },
  {
    "name": "Dianella",
    "coordinates": {
      "lat": -31.88824,
      "lng": 115.87198
    }
  },
  {
    "name": "Doobarda",
    "coordinates": {
      "lat": -32.17398,
      "lng": 115.94715
    }
  },
  {
    "name": "Doubleview",
    "coordinates": {
      "lat": -31.89633,
      "lng": 115.78164
    }
  },
  {
    "name": "Duncraig",
    "coordinates": {
      "lat": -31.83279,
      "lng": 115.77642
    }
  },
  {
    "name": "East Cannington",
    "coordinates": {
      "lat": -32.00903,
      "lng": 115.95881
    }
  },
  {
    "name": "East Fremantle",
    "coordinates": {
      "lat": -32.03669,
      "lng": 115.76774
    }
  },
  {
    "name": "East Perth",
    "coordinates": {
      "lat": -31.95824,
      "lng": 115.87717
    }
  },
  {
    "name": "East Rockingham",
    "coordinates": {
      "lat": -32.26239,
      "lng": 115.76979
    }
  },
  {
    "name": "East Victoria Park",
    "coordinates": {
      "lat": -31.98932,
      "lng": 115.90383
    }
  },
  {
    "name": "Eden Hill",
    "coordinates": {
      "lat": -31.89096,
      "lng": 115.94726
    }
  },
  {
    "name": "Edgewater",
    "coordinates": {
      "lat": -31.7638,
      "lng": 115.7852
    }
  },
  {
    "name": "Eglinton",
    "coordinates": {
      "lat": -31.58424,
      "lng": 115.66762
    }
  },
  {
    "name": "Ellenbrook",
    "coordinates": {
      "lat": -31.76787,
      "lng": 115.9777
    }
  },
  {
    "name": "Embleton",
    "coordinates": {
      "lat": -31.90213,
      "lng": 115.91123
    }
  },
  {
    "name": "Ferndale",
    "coordinates": {
      "lat": -32.02942,
      "lng": 115.92472
    }
  },
  {
    "name": "Floreat",
    "coordinates": {
      "lat": -31.93918,
      "lng": 115.79174
    }
  },
  {
    "name": "Flynn",
    "coordinates": {
      "lat": -32.05245,
      "lng": 116.47763
    }
  },
  {
    "name": "Forrestdale",
    "coordinates": {
      "lat": -32.15292,
      "lng": 115.93265
    }
  },
  {
    "name": "Forrestfield",
    "coordinates": {
      "lat": -31.98382,
      "lng": 116.0074
    }
  },
  {
    "name": "Fremantle",
    "coordinates": {
      "lat": -32.0534,
      "lng": 115.75863
    }
  },
  {
    "name": "Garden Island",
    "coordinates": {
      "lat": -32.20225,
      "lng": 115.67674
    }
  },
  {
    "name": "Gidgegannup",
    "coordinates": {
      "lat": -31.75424,
      "lng": 116.18783
    }
  },
  {
    "name": "Girrawheen",
    "coordinates": {
      "lat": -31.84093,
      "lng": 115.8397
    }
  },
  {
    "name": "Glen Forrest",
    "coordinates": {
      "lat": -31.91931,
      "lng": 116.10726
    }
  },
  {
    "name": "Glendalough",
    "coordinates": {
      "lat": -31.91988,
      "lng": 115.81952
    }
  },
  {
    "name": "Gnangara",
    "coordinates": {
      "lat": -31.7753,
      "lng": 115.86502
    }
  },
  {
    "name": "Golden Bay",
    "coordinates": {
      "lat": -32.42506,
      "lng": 115.7607
    }
  },
  {
    "name": "Gooseberry Hill",
    "coordinates": {
      "lat": -31.9472,
      "lng": 116.04898
    }
  },
  {
    "name": "Gorrie",
    "coordinates": {
      "lat": -31.91047,
      "lng": 116.31122
    }
  },
  {
    "name": "Gosnells",
    "coordinates": {
      "lat": -32.08315,
      "lng": 115.99277
    }
  },
  {
    "name": "Greenmount",
    "coordinates": {
      "lat": -31.90275,
      "lng": 116.05573
    }
  },
  {
    "name": "Greenwood",
    "coordinates": {
      "lat": -31.82722,
      "lng": 115.80279
    }
  },
  {
    "name": "Guildford",
    "coordinates": {
      "lat": -31.89741,
      "lng": 115.97494
    }
  },
  {
    "name": "Gwelup",
    "coordinates": {
      "lat": -31.87145,
      "lng": 115.79485
    }
  },
  {
    "name": "Hacketts Gully",
    "coordinates": {
      "lat": -31.98291,
      "lng": 116.11744
    }
  },
  {
    "name": "Hamersley",
    "coordinates": {
      "lat": -31.85096,
      "lng": 115.81253
    }
  },
  {
    "name": "Hamilton Hill",
    "coordinates": {
      "lat": -32.08451,
      "lng": 115.77949
    }
  },
  {
    "name": "Hammond Park",
    "coordinates": {
      "lat": -32.17132,
      "lng": 115.84665
    }
  },
  {
    "name": "Harrisdale",
    "coordinates": {
      "lat": -32.11752,
      "lng": 115.9324
    }
  },
  {
    "name": "Haynes",
    "coordinates": {
      "lat": -32.1551,
      "lng": 115.97507
    }
  },
  {
    "name": "Hazelmere",
    "coordinates": {
      "lat": -31.91268,
      "lng": 116.00539
    }
  },
  {
    "name": "Heathridge",
    "coordinates": {
      "lat": -31.76321,
      "lng": 115.76034
    }
  },
  {
    "name": "Helena Valley",
    "coordinates": {
      "lat": -31.91921,
      "lng": 116.03958
    }
  },
  {
    "name": "Henderson",
    "coordinates": {
      "lat": -32.15852,
      "lng": 115.77894
    }
  },
  {
    "name": "Henley Brook",
    "coordinates": {
      "lat": -31.80925,
      "lng": 115.98857
    }
  },
  {
    "name": "Herdsman",
    "coordinates": {
      "lat": -31.9201,
      "lng": 115.80554
    }
  },
  {
    "name": "Herne Hill",
    "coordinates": {
      "lat": -31.83013,
      "lng": 116.03137
    }
  },
  {
    "name": "High Wycombe",
    "coordinates": {
      "lat": -31.94526,
      "lng": 116.00113
    }
  },
  {
    "name": "Highgate",
    "coordinates": {
      "lat": -31.94005,
      "lng": 115.87049
    }
  },
  {
    "name": "Hilbert",
    "coordinates": {
      "lat": -32.1745,
      "lng": 115.97861
    }
  },
  {
    "name": "Hillarys",
    "coordinates": {
      "lat": -31.80893,
      "lng": 115.74358
    }
  },
  {
    "name": "Hillman",
    "coordinates": {
      "lat": -32.28135,
      "lng": 115.76866
    }
  },
  {
    "name": "Hilton",
    "coordinates": {
      "lat": -32.06804,
      "lng": 115.78575
    }
  },
  {
    "name": "Hocking",
    "coordinates": {
      "lat": -31.7701,
      "lng": 115.81832
    }
  },
  {
    "name": "Hope Valley",
    "coordinates": {
      "lat": -32.19696,
      "lng": 115.81174
    }
  },
  {
    "name": "Hopeland",
    "coordinates": {
      "lat": -32.38157,
      "lng": 115.88766
    }
  },
  {
    "name": "Hovea",
    "coordinates": {
      "lat": -31.875,
      "lng": 116.09756
    }
  },
  {
    "name": "Huntingdale",
    "coordinates": {
      "lat": -32.08312,
      "lng": 115.96616
    }
  },
  {
    "name": "Iluka",
    "coordinates": {
      "lat": -31.73574,
      "lng": 115.72912
    }
  },
  {
    "name": "Inglewood",
    "coordinates": {
      "lat": -31.91661,
      "lng": 115.87989
    }
  },
  {
    "name": "Innaloo",
    "coordinates": {
      "lat": -31.89286,
      "lng": 115.79575
    }
  },
  {
    "name": "Jandabup",
    "coordinates": {
      "lat": -31.73906,
      "lng": 115.85696
    }
  },
  {
    "name": "Jandakot",
    "coordinates": {
      "lat": -32.10239,
      "lng": 115.87234
    }
  },
  {
    "name": "Jane Brook",
    "coordinates": {
      "lat": -31.85881,
      "lng": 116.06246
    }
  },
  {
    "name": "Jarrahdale",
    "coordinates": {
      "lat": -32.35666,
      "lng": 116.14341
    }
  },
  {
    "name": "Jindalee",
    "coordinates": {
      "lat": -31.6417,
      "lng": 115.68483
    }
  },
  {
    "name": "Jolimont",
    "coordinates": {
      "lat": -31.94585,
      "lng": 115.80928
    }
  },
  {
    "name": "Joondalup",
    "coordinates": {
      "lat": -31.73766,
      "lng": 115.77031
    }
  },
  {
    "name": "Joondanna",
    "coordinates": {
      "lat": -31.91007,
      "lng": 115.83729
    }
  },
  {
    "name": "Kalamunda",
    "coordinates": {
      "lat": -31.97597,
      "lng": 116.05474
    }
  },
  {
    "name": "Kallaroo",
    "coordinates": {
      "lat": -31.79075,
      "lng": 115.74424
    }
  },
  {
    "name": "Karawara",
    "coordinates": {
      "lat": -32.00861,
      "lng": 115.88128
    }
  },
  {
    "name": "Kardinya",
    "coordinates": {
      "lat": -32.06557,
      "lng": 115.81485
    }
  },
  {
    "name": "Karnup",
    "coordinates": {
      "lat": -32.41745,
      "lng": 115.79455
    }
  },
  {
    "name": "Karragullen",
    "coordinates": {
      "lat": -32.10257,
      "lng": 116.13851
    }
  },
  {
    "name": "Karrakatta",
    "coordinates": {
      "lat": -31.96772,
      "lng": 115.79801
    }
  },
  {
    "name": "Karrakup",
    "coordinates": {
      "lat": -32.2538,
      "lng": 116.06844
    }
  },
  {
    "name": "Karrinyup",
    "coordinates": {
      "lat": -31.87221,
      "lng": 115.7769
    }
  },
  {
    "name": "Kelmscott",
    "coordinates": {
      "lat": -32.11512,
      "lng": 116.02548
    }
  },
  {
    "name": "Kensington",
    "coordinates": {
      "lat": -31.98577,
      "lng": 115.88424
    }
  },
  {
    "name": "Kenwick",
    "coordinates": {
      "lat": -32.02712,
      "lng": 115.98113
    }
  },
  {
    "name": "Keralup",
    "coordinates": {
      "lat": -32.4463,
      "lng": 115.83226
    }
  },
  {
    "name": "Kewdale",
    "coordinates": {
      "lat": -31.97886,
      "lng": 115.95183
    }
  },
  {
    "name": "Keysbrook",
    "coordinates": {
      "lat": -32.437,
      "lng": 116.03072
    }
  },
  {
    "name": "Kiara",
    "coordinates": {
      "lat": -31.88158,
      "lng": 115.93898
    }
  },
  {
    "name": "Kings Park",
    "coordinates": {
      "lat": -31.96604,
      "lng": 115.83946
    }
  },
  {
    "name": "Kingsley",
    "coordinates": {
      "lat": -31.81047,
      "lng": 115.80101
    }
  },
  {
    "name": "Kinross",
    "coordinates": {
      "lat": -31.71797,
      "lng": 115.7383
    }
  },
  {
    "name": "Koondoola",
    "coordinates": {
      "lat": -31.84138,
      "lng": 115.86659
    }
  },
  {
    "name": "Koongamia",
    "coordinates": {
      "lat": -31.90656,
      "lng": 116.04228
    }
  },
  {
    "name": "Kwinana Beach",
    "coordinates": {
      "lat": -32.22912,
      "lng": 115.77609
    }
  },
  {
    "name": "Kwinana Town Centre",
    "coordinates": {
      "lat": -32.24798,
      "lng": 115.81459
    }
  },
  {
    "name": "Lake Coogee",
    "coordinates": {
      "lat": -32.12936,
      "lng": 115.78237
    }
  },
  {
    "name": "Lakelands",
    "coordinates": {
      "lat": -32.46875,
      "lng": 115.77236
    }
  },
  {
    "name": "Landsdale",
    "coordinates": {
      "lat": -31.80761,
      "lng": 115.86242
    }
  },
  {
    "name": "Langford",
    "coordinates": {
      "lat": -32.04111,
      "lng": 115.94148
    }
  },
  {
    "name": "Lathlain",
    "coordinates": {
      "lat": -31.96753,
      "lng": 115.90637
    }
  },
  {
    "name": "Leda",
    "coordinates": {
      "lat": -32.26758,
      "lng": 115.79925
    }
  },
  {
    "name": "Leederville",
    "coordinates": {
      "lat": -31.93198,
      "lng": 115.84101
    }
  },
  {
    "name": "Leeming",
    "coordinates": {
      "lat": -32.07576,
      "lng": 115.86728
    }
  },
  {
    "name": "Lesley",
    "coordinates": {
      "lat": -32.1362,
      "lng": 116.24296
    }
  },
  {
    "name": "Lesmurdie",
    "coordinates": {
      "lat": -32.00754,
      "lng": 116.04527
    }
  },
  {
    "name": "Lexia",
    "coordinates": {
      "lat": -31.7789,
      "lng": 115.91934
    }
  },
  {
    "name": "Lockridge",
    "coordinates": {
      "lat": -31.8819,
      "lng": 115.95034
    }
  },
  {
    "name": "Lynwood",
    "coordinates": {
      "lat": -32.04012,
      "lng": 115.92885
    }
  },
  {
    "name": "Maddington",
    "coordinates": {
      "lat": -32.04763,
      "lng": 115.99581
    }
  },
  {
    "name": "Madeley",
    "coordinates": {
      "lat": -31.81092,
      "lng": 115.8278
    }
  },
  {
    "name": "Madora Bay",
    "coordinates": {
      "lat": -32.46943,
      "lng": 115.7524
    }
  },
  {
    "name": "Mahogany Creek",
    "coordinates": {
      "lat": -31.91644,
      "lng": 116.13202
    }
  },
  {
    "name": "Maida Vale",
    "coordinates": {
      "lat": -31.95635,
      "lng": 116.02295
    }
  },
  {
    "name": "Malaga",
    "coordinates": {
      "lat": -31.85854,
      "lng": 115.89436
    }
  },
  {
    "name": "Malmalling",
    "coordinates": {
      "lat": -31.96869,
      "lng": 116.35878
    }
  },
  {
    "name": "Mandogalup",
    "coordinates": {
      "lat": -32.19295,
      "lng": 115.84345
    }
  },
  {
    "name": "Manning",
    "coordinates": {
      "lat": -32.01336,
      "lng": 115.86988
    }
  },
  {
    "name": "Marangaroo",
    "coordinates": {
      "lat": -31.82762,
      "lng": 115.83757
    }
  },
  {
    "name": "Mardella",
    "coordinates": {
      "lat": -32.3228,
      "lng": 115.93318
    }
  },
  {
    "name": "Mariginiup",
    "coordinates": {
      "lat": -31.71105,
      "lng": 115.84323
    }
  },
  {
    "name": "Marmion",
    "coordinates": {
      "lat": -31.84151,
      "lng": 115.75697
    }
  },
  {
    "name": "Martin",
    "coordinates": {
      "lat": -32.07541,
      "lng": 116.04563
    }
  },
  {
    "name": "Maylands",
    "coordinates": {
      "lat": -31.93692,
      "lng": 115.90017
    }
  },
  {
    "name": "Medina",
    "coordinates": {
      "lat": -32.23404,
      "lng": 115.79901
    }
  },
  {
    "name": "Melaleuca",
    "coordinates": {
      "lat": -31.71533,
      "lng": 115.91981
    }
  },
  {
    "name": "Melville",
    "coordinates": {
      "lat": -32.04046,
      "lng": 115.80131
    }
  },
  {
    "name": "Menora",
    "coordinates": {
      "lat": -31.91881,
      "lng": 115.86221
    }
  },
  {
    "name": "Merriwa",
    "coordinates": {
      "lat": -31.66493,
      "lng": 115.71274
    }
  },
  {
    "name": "Middle Swan",
    "coordinates": {
      "lat": -31.85831,
      "lng": 116.02058
    }
  },
  {
    "name": "Midland",
    "coordinates": {
      "lat": -31.88953,
      "lng": 116.01053
    }
  },
  {
    "name": "Midvale",
    "coordinates": {
      "lat": -31.88521,
      "lng": 116.02953
    }
  },
  {
    "name": "Millendon",
    "coordinates": {
      "lat": -31.80772,
      "lng": 116.03675
    }
  },
  {
    "name": "Mindarie",
    "coordinates": {
      "lat": -31.69331,
      "lng": 115.70915
    }
  },
  {
    "name": "Mirrabooka",
    "coordinates": {
      "lat": -31.8596,
      "lng": 115.86595
    }
  },
  {
    "name": "Morley",
    "coordinates": {
      "lat": -31.88759,
      "lng": 115.91016
    }
  },
  {
    "name": "Mosman Park",
    "coordinates": {
      "lat": -32.01484,
      "lng": 115.76555
    }
  },
  {
    "name": "Mount Claremont",
    "coordinates": {
      "lat": -31.96029,
      "lng": 115.78034
    }
  },
  {
    "name": "Mount Cooke",
    "coordinates": {
      "lat": -32.37713,
      "lng": 116.35199
    }
  },
  {
    "name": "Mount Hawthorn",
    "coordinates": {
      "lat": -31.92007,
      "lng": 115.83508
    }
  },
  {
    "name": "Mount Helena",
    "coordinates": {
      "lat": -31.85815,
      "lng": 116.2095
    }
  },
  {
    "name": "Mount Lawley",
    "coordinates": {
      "lat": -31.93009,
      "lng": 115.87462
    }
  },
  {
    "name": "Mount Nasura",
    "coordinates": {
      "lat": -32.13762,
      "lng": 116.0248
    }
  },
  {
    "name": "Mount Pleasant",
    "coordinates": {
      "lat": -32.0282,
      "lng": 115.84895
    }
  },
  {
    "name": "Mount Richon",
    "coordinates": {
      "lat": -32.16382,
      "lng": 116.02107
    }
  },
  {
    "name": "Muchea",
    "coordinates": {
      "lat": -31.55716,
      "lng": 115.92821
    }
  },
  {
    "name": "Mullaloo",
    "coordinates": {
      "lat": -31.77837,
      "lng": 115.74263
    }
  },
  {
    "name": "Mundaring",
    "coordinates": {
      "lat": -31.92324,
      "lng": 116.16367
    }
  },
  {
    "name": "Mundijong",
    "coordinates": {
      "lat": -32.28768,
      "lng": 115.97876
    }
  },
  {
    "name": "Munster",
    "coordinates": {
      "lat": -32.14696,
      "lng": 115.80502
    }
  },
  {
    "name": "Murdoch",
    "coordinates": {
      "lat": -32.06986,
      "lng": 115.83757
    }
  },
  {
    "name": "Myara",
    "coordinates": {
      "lat": -32.48537,
      "lng": 116.05616
    }
  },
  {
    "name": "Myaree",
    "coordinates": {
      "lat": -32.04153,
      "lng": 115.8156
    }
  },
  {
    "name": "Nambeelup",
    "coordinates": {
      "lat": -32.50596,
      "lng": 115.86747
    }
  },
  {
    "name": "Naval Base",
    "coordinates": {
      "lat": -32.1952,
      "lng": 115.78156
    }
  },
  {
    "name": "Nedlands",
    "coordinates": {
      "lat": -31.97984,
      "lng": 115.80567
    }
  },
  {
    "name": "Neerabup",
    "coordinates": {
      "lat": -31.68417,
      "lng": 115.76904
    }
  },
  {
    "name": "Nollamara",
    "coordinates": {
      "lat": -31.88016,
      "lng": 115.84545
    }
  },
  {
    "name": "Noranda",
    "coordinates": {
      "lat": -31.87331,
      "lng": 115.89899
    }
  },
  {
    "name": "North Beach",
    "coordinates": {
      "lat": -31.86054,
      "lng": 115.75916
    }
  },
  {
    "name": "North Coogee",
    "coordinates": {
      "lat": -32.09299,
      "lng": 115.7594
    }
  },
  {
    "name": "North Dandalup",
    "coordinates": {
      "lat": -32.51013,
      "lng": 115.95942
    }
  },
  {
    "name": "North Fremantle",
    "coordinates": {
      "lat": -32.03763,
      "lng": 115.74682
    }
  },
  {
    "name": "North Lake",
    "coordinates": {
      "lat": -32.08059,
      "lng": 115.83182
    }
  },
  {
    "name": "North Perth",
    "coordinates": {
      "lat": -31.9271,
      "lng": 115.85304
    }
  },
  {
    "name": "Northbridge",
    "coordinates": {
      "lat": -31.94612,
      "lng": 115.85558
    }
  },
  {
    "name": "Nowergup",
    "coordinates": {
      "lat": -31.6386,
      "lng": 115.7572
    }
  },
  {
    "name": "O'Connor",
    "coordinates": {
      "lat": -32.05957,
      "lng": 115.79238
    }
  },
  {
    "name": "Oakford",
    "coordinates": {
      "lat": -32.21055,
      "lng": 115.92923
    }
  },
  {
    "name": "Ocean Reef",
    "coordinates": {
      "lat": -31.7587,
      "lng": 115.73595
    }
  },
  {
    "name": "Oldbury",
    "coordinates": {
      "lat": -32.2657,
      "lng": 115.91835
    }
  },
  {
    "name": "Orange Grove",
    "coordinates": {
      "lat": -32.03866,
      "lng": 116.029
    }
  },
  {
    "name": "Orelia",
    "coordinates": {
      "lat": -32.2332,
      "lng": 115.82349
    }
  },
  {
    "name": "Osborne Park",
    "coordinates": {
      "lat": -31.90488,
      "lng": 115.81727
    }
  },
  {
    "name": "Padbury",
    "coordinates": {
      "lat": -31.80647,
      "lng": 115.76933
    }
  },
  {
    "name": "Palmyra",
    "coordinates": {
      "lat": -32.04495,
      "lng": 115.7859
    }
  },
  {
    "name": "Parkerville",
    "coordinates": {
      "lat": -31.86654,
      "lng": 116.1336
    }
  },
  {
    "name": "Parkwood",
    "coordinates": {
      "lat": -32.04777,
      "lng": 115.915
    }
  },
  {
    "name": "Parmelia",
    "coordinates": {
      "lat": -32.2467,
      "lng": 115.82747
    }
  },
  {
    "name": "Paulls Valley",
    "coordinates": {
      "lat": -31.95796,
      "lng": 116.12404
    }
  },
  {
    "name": "Pearsall",
    "coordinates": {
      "lat": -31.78142,
      "lng": 115.81878
    }
  },
  {
    "name": "Peppermint Grove",
    "coordinates": {
      "lat": -31.9993,
      "lng": 115.76716
    }
  },
  {
    "name": "Peron",
    "coordinates": {
      "lat": -32.27684,
      "lng": 115.70083
    }
  },
  {
    "name": "Perth",
    "coordinates": {
      "lat": -31.95393,
      "lng": 115.85825
    }
  },
  {
    "name": "Perth Airport",
    "coordinates": {
      "lat": -31.94421,
      "lng": 115.97219
    }
  },
  {
    "name": "Piara Waters",
    "coordinates": {
      "lat": -32.1335,
      "lng": 115.91645
    }
  },
  {
    "name": "Pickering Brook",
    "coordinates": {
      "lat": -32.04949,
      "lng": 116.19473
    }
  },
  {
    "name": "Piesse Brook",
    "coordinates": {
      "lat": -31.95979,
      "lng": 116.07618
    }
  },
  {
    "name": "Pinjar",
    "coordinates": {
      "lat": -31.61835,
      "lng": 115.83077
    }
  },
  {
    "name": "Port Kennedy",
    "coordinates": {
      "lat": -32.37222,
      "lng": 115.75381
    }
  },
  {
    "name": "Postans",
    "coordinates": {
      "lat": -32.21897,
      "lng": 115.81222
    }
  },
  {
    "name": "Queens Park",
    "coordinates": {
      "lat": -32.00296,
      "lng": 115.94621
    }
  },
  {
    "name": "Quinns Rocks",
    "coordinates": {
      "lat": -31.66515,
      "lng": 115.69736
    }
  },
  {
    "name": "Red Hill",
    "coordinates": {
      "lat": -31.82753,
      "lng": 116.07452
    }
  },
  {
    "name": "Redcliffe",
    "coordinates": {
      "lat": -31.93846,
      "lng": 115.9465
    }
  },
  {
    "name": "Reservoir",
    "coordinates": {
      "lat": -31.99693,
      "lng": 116.18231
    }
  },
  {
    "name": "Ridgewood",
    "coordinates": {
      "lat": -31.66134,
      "lng": 115.72262
    }
  },
  {
    "name": "Riverton",
    "coordinates": {
      "lat": -32.0346,
      "lng": 115.89898
    }
  },
  {
    "name": "Rivervale",
    "coordinates": {
      "lat": -31.96052,
      "lng": 115.91596
    }
  },
  {
    "name": "Rockingham",
    "coordinates": {
      "lat": -32.28224,
      "lng": 115.73901
    }
  },
  {
    "name": "Roleystone",
    "coordinates": {
      "lat": -32.12266,
      "lng": 116.08487
    }
  },
  {
    "name": "Rossmoyne",
    "coordinates": {
      "lat": -32.03959,
      "lng": 115.86793
    }
  },
  {
    "name": "Rottnest Island",
    "coordinates": {
      "lat": -32.00619,
      "lng": 115.51235
    }
  },
  {
    "name": "Safety Bay",
    "coordinates": {
      "lat": -32.30453,
      "lng": 115.7304
    }
  },
  {
    "name": "Salter Point",
    "coordinates": {
      "lat": -32.02366,
      "lng": 115.86582
    }
  },
  {
    "name": "Samson",
    "coordinates": {
      "lat": -32.06994,
      "lng": 115.79769
    }
  },
  {
    "name": "Sawyers Valley",
    "coordinates": {
      "lat": -31.96047,
      "lng": 116.25216
    }
  },
  {
    "name": "Scarborough",
    "coordinates": {
      "lat": -31.89648,
      "lng": 115.7654
    }
  },
  {
    "name": "Secret Harbour",
    "coordinates": {
      "lat": -32.40593,
      "lng": 115.75822
    }
  },
  {
    "name": "Serpentine",
    "coordinates": {
      "lat": -32.3855,
      "lng": 116.0082
    }
  },
  {
    "name": "Seville Grove",
    "coordinates": {
      "lat": -32.13627,
      "lng": 115.98939
    }
  },
  {
    "name": "Shelley",
    "coordinates": {
      "lat": -32.0297,
      "lng": 115.88662
    }
  },
  {
    "name": "Shenton Park",
    "coordinates": {
      "lat": -31.95717,
      "lng": 115.80533
    }
  },
  {
    "name": "Shoalwater",
    "coordinates": {
      "lat": -32.29501,
      "lng": 115.70944
    }
  },
  {
    "name": "Sinagra",
    "coordinates": {
      "lat": -31.74199,
      "lng": 115.8066
    }
  },
  {
    "name": "Singleton",
    "coordinates": {
      "lat": -32.44402,
      "lng": 115.75691
    }
  },
  {
    "name": "Solus",
    "coordinates": {
      "lat": -32.52314,
      "lng": 116.17872
    }
  },
  {
    "name": "Sorrento",
    "coordinates": {
      "lat": -31.82783,
      "lng": 115.75363
    }
  },
  {
    "name": "South Fremantle",
    "coordinates": {
      "lat": -32.07175,
      "lng": 115.75446
    }
  },
  {
    "name": "South Guildford",
    "coordinates": {
      "lat": -31.91166,
      "lng": 115.97561
    }
  },
  {
    "name": "South Lake",
    "coordinates": {
      "lat": -32.10732,
      "lng": 115.84088
    }
  },
  {
    "name": "South Perth",
    "coordinates": {
      "lat": -31.97878,
      "lng": 115.8627
    }
  },
  {
    "name": "Southern River",
    "coordinates": {
      "lat": -32.10661,
      "lng": 115.96045
    }
  },
  {
    "name": "Spearwood",
    "coordinates": {
      "lat": -32.10428,
      "lng": 115.7838
    }
  },
  {
    "name": "St James",
    "coordinates": {
      "lat": -32.00001,
      "lng": 115.91043
    }
  },
  {
    "name": "Stake Hill",
    "coordinates": {
      "lat": -32.49093,
      "lng": 115.80209
    }
  },
  {
    "name": "Stirling",
    "coordinates": {
      "lat": -31.88511,
      "lng": 115.81104
    }
  },
  {
    "name": "Stoneville",
    "coordinates": {
      "lat": -31.85861,
      "lng": 116.16526
    }
  },
  {
    "name": "Stratton",
    "coordinates": {
      "lat": -31.86793,
      "lng": 116.04184
    }
  },
  {
    "name": "Subiaco",
    "coordinates": {
      "lat": -31.94869,
      "lng": 115.82446
    }
  },
  {
    "name": "Success",
    "coordinates": {
      "lat": -32.14251,
      "lng": 115.84958
    }
  },
  {
    "name": "Swan View",
    "coordinates": {
      "lat": -31.88246,
      "lng": 116.05282
    }
  },
  {
    "name": "Swanbourne",
    "coordinates": {
      "lat": -31.97069,
      "lng": 115.76371
    }
  },
  {
    "name": "Tamala Park",
    "coordinates": {
      "lat": -31.70654,
      "lng": 115.73347
    }
  },
  {
    "name": "Tapping",
    "coordinates": {
      "lat": -31.71945,
      "lng": 115.79561
    }
  },
  {
    "name": "The Lakes",
    "coordinates": {
      "lat": -31.90933,
      "lng": 116.41515
    }
  },
  {
    "name": "The Spectacles",
    "coordinates": {
      "lat": -32.22037,
      "lng": 115.83905
    }
  },
  {
    "name": "The Vines",
    "coordinates": {
      "lat": -31.75893,
      "lng": 116.00502
    }
  },
  {
    "name": "Thornlie",
    "coordinates": {
      "lat": -32.06005,
      "lng": 115.95508
    }
  },
  {
    "name": "Treeby",
    "coordinates": {
      "lat": -32.1208,
      "lng": 115.89251
    }
  },
  {
    "name": "Trigg",
    "coordinates": {
      "lat": -31.87621,
      "lng": 115.75816
    }
  },
  {
    "name": "Tuart Hill",
    "coordinates": {
      "lat": -31.89798,
      "lng": 115.83505
    }
  },
  {
    "name": "Two Rocks",
    "coordinates": {
      "lat": -31.48554,
      "lng": 115.6163
    }
  },
  {
    "name": "Upper Swan",
    "coordinates": {
      "lat": -31.76385,
      "lng": 116.04073
    }
  },
  {
    "name": "Victoria Park",
    "coordinates": {
      "lat": -31.9755,
      "lng": 115.89345
    }
  },
  {
    "name": "Viveash",
    "coordinates": {
      "lat": -31.87642,
      "lng": 115.9996
    }
  },
  {
    "name": "Waikiki",
    "coordinates": {
      "lat": -32.31612,
      "lng": 115.76536
    }
  },
  {
    "name": "Walliston",
    "coordinates": {
      "lat": -32.00048,
      "lng": 116.07513
    }
  },
  {
    "name": "Walyunga National Park",
    "coordinates": {
      "lat": -31.72187,
      "lng": 116.07644
    }
  },
  {
    "name": "Wandi",
    "coordinates": {
      "lat": -32.19429,
      "lng": 115.87629
    }
  },
  {
    "name": "Wangara",
    "coordinates": {
      "lat": -31.79397,
      "lng": 115.83144
    }
  },
  {
    "name": "Wanneroo",
    "coordinates": {
      "lat": -31.75755,
      "lng": 115.81622
    }
  },
  {
    "name": "Warnbro",
    "coordinates": {
      "lat": -32.33777,
      "lng": 115.76808
    }
  },
  {
    "name": "Warwick",
    "coordinates": {
      "lat": -31.83965,
      "lng": 115.8087
    }
  },
  {
    "name": "Waterford",
    "coordinates": {
      "lat": -32.01571,
      "lng": 115.88659
    }
  },
  {
    "name": "Watermans Bay",
    "coordinates": {
      "lat": -31.85099,
      "lng": 115.75924
    }
  },
  {
    "name": "Wattle Grove",
    "coordinates": {
      "lat": -32.00579,
      "lng": 116.00281
    }
  },
  {
    "name": "Wattleup",
    "coordinates": {
      "lat": -32.16768,
      "lng": 115.81305
    }
  },
  {
    "name": "Wellard",
    "coordinates": {
      "lat": -32.26627,
      "lng": 115.84623
    }
  },
  {
    "name": "Welshpool",
    "coordinates": {
      "lat": -31.99261,
      "lng": 115.94896
    }
  },
  {
    "name": "Wembley",
    "coordinates": {
      "lat": -31.93305,
      "lng": 115.81844
    }
  },
  {
    "name": "Wembley Downs",
    "coordinates": {
      "lat": -31.91854,
      "lng": 115.77723
    }
  },
  {
    "name": "West Leederville",
    "coordinates": {
      "lat": -31.93868,
      "lng": 115.8331
    }
  },
  {
    "name": "West Perth",
    "coordinates": {
      "lat": -31.94603,
      "lng": 115.84555
    }
  },
  {
    "name": "West Swan",
    "coordinates": {
      "lat": -31.84566,
      "lng": 115.99077
    }
  },
  {
    "name": "Westminster",
    "coordinates": {
      "lat": -31.86736,
      "lng": 115.83934
    }
  },
  {
    "name": "Whitby",
    "coordinates": {
      "lat": -32.28296,
      "lng": 116.01531
    }
  },
  {
    "name": "White Gum Valley",
    "coordinates": {
      "lat": -32.06029,
      "lng": 115.77058
    }
  },
  {
    "name": "Whiteman",
    "coordinates": {
      "lat": -31.82555,
      "lng": 115.93933
    }
  },
  {
    "name": "Willagee",
    "coordinates": {
      "lat": -32.05201,
      "lng": 115.80528
    }
  },
  {
    "name": "Willetton",
    "coordinates": {
      "lat": -32.05245,
      "lng": 115.88784
    }
  },
  {
    "name": "Wilson",
    "coordinates": {
      "lat": -32.02037,
      "lng": 115.91184
    }
  },
  {
    "name": "Winthrop",
    "coordinates": {
      "lat": -32.0522,
      "lng": 115.82966
    }
  },
  {
    "name": "Woodbridge",
    "coordinates": {
      "lat": -31.8909,
      "lng": 115.99337
    }
  },
  {
    "name": "Woodlands",
    "coordinates": {
      "lat": -31.90812,
      "lng": 115.79237
    }
  },
  {
    "name": "Woodvale",
    "coordinates": {
      "lat": -31.78931,
      "lng": 115.79638
    }
  },
  {
    "name": "Wooroloo",
    "coordinates": {
      "lat": -31.80421,
      "lng": 116.32069
    }
  },
  {
    "name": "Wundowie",
    "coordinates": {
      "lat": -31.75487,
      "lng": 116.3728
    }
  },
  {
    "name": "Wungong",
    "coordinates": {
      "lat": -32.1831,
      "lng": 116.01295
    }
  },
  {
    "name": "Yanchep",
    "coordinates": {
      "lat": -31.52557,
      "lng": 115.73813
    }
  },
  {
    "name": "Yangebup",
    "coordinates": {
      "lat": -32.1207,
      "lng": 115.81625
    }
  },
  {
    "name": "Yokine",
    "coordinates": {
      "lat": -31.90112,
      "lng": 115.85321
    }
  }
];
