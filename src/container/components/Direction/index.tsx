import L, { LocationEvent } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { getDirections } from '../../../services/apiMapBox';

type DirectionProps = {
  currentLocation: LocationEvent | undefined;
  endLocation: number[];
};

const Direction: React.FC<DirectionProps> = ({
  currentLocation,
  endLocation,
}) => {
  const map = useMap();

  useEffect(() => {
    const getMapDirections = async () => {
      if (currentLocation) {
        const startPoint = [
          currentLocation.latlng.lat,
          currentLocation.latlng.lng,
        ];
        const directions = await getDirections(startPoint, endLocation);
        console.log('directions', directions);

        if (directions.routes) {
          const coordinates = directions.routes[0]?.geometry.coordinates;

          const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          };

          L.geoJSON(geojson as any, {
            style: (feature) => ({
              color: '#1B1B1F',
              weight: 3,
              opacity: 0.7,
            }),
          }).addTo(map);

          map.flyToBounds([startPoint, endLocation] as any);
        }
      }
    };
    getMapDirections();
  }, [currentLocation, endLocation, map]);

  return null;
};

export default Direction;
