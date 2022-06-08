import axios from 'axios';

const ACCESS_TOKEN_MAP_BOX = `access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAP_BOX}`;
const API_MAP_BOX_URL = 'https://api.mapbox.com/';

type Direction = {
  routes: {
    geometry: {
      coordinates: number[];
    };
  }[];
};

export type FeatureProps = {
  address: string;
  text: string;
  place_name: string;
  geometry: {
    coordinates: number[];
  };
};

export type GeoCoding = {
  features: FeatureProps[];
};

export const staticTilesEndpoint = `${API_MAP_BOX_URL}styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?${ACCESS_TOKEN_MAP_BOX}`;

export async function getDirections(
  startLocation: number[],
  endLocation: number[],
): Promise<Direction> {
  const fetchDirections = await fetch(
    `${API_MAP_BOX_URL}directions/v5/mapbox/driving/${startLocation[1]},${startLocation[0]};${endLocation[1]},${endLocation[0]}?&geometries=geojson&${ACCESS_TOKEN_MAP_BOX}`,
  );
  const directionsData = await fetchDirections.json();
  return directionsData;
}

export async function getLatLongByAddress(
  address: string,
): Promise<GeoCoding | undefined> {
  const { data } = await axios.get<GeoCoding>(
    `${API_MAP_BOX_URL}geocoding/v5/mapbox.places/${encodeURI(
      address,
    )}.json?limit=4&types=place,address&${ACCESS_TOKEN_MAP_BOX}`,
  );

  if (data) {
    return data;
  }

  return undefined;
}
