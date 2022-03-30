import L, { LocationEvent } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { getDirections } from '../../../services/apiMapBox';

type DirectionProps = {
  currentLocation: LocationEvent | undefined;
  endLocation: L.LatLng | undefined;
  hasFinishedSchedule: boolean;
};

const Direction: React.FC<DirectionProps> = ({
  currentLocation,
  endLocation,
  hasFinishedSchedule,
}) => {
  const map = useMap();
  const [, setCurrentPathLayer] = useState<L.GeoJSON>();
  useEffect(() => {
    const getMapDirections = async () => {
      if (currentLocation && endLocation && hasFinishedSchedule) {
        (map as any).spin(true);
        const startPoint = [
          currentLocation.latlng.lat,
          currentLocation.latlng.lng,
        ];
        const directions = await getDirections(startPoint, [
          endLocation.lat,
          endLocation.lng,
        ]);
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

          const currentPathLayer = L.geoJSON(geojson as any, {
            style: () => ({
              color: '#1B1B1F',
              weight: 3,
              opacity: 0.7,
            }),
          }).addTo(map);
          setCurrentPathLayer((previousPathLayer) => {
            if (previousPathLayer) {
              map.removeLayer(previousPathLayer);
            }
            return currentPathLayer;
          });

          (map as any).spin(false);
          map.fitBounds([startPoint, endLocation] as any);
        }
      }
    };
    getMapDirections();
  }, [currentLocation, endLocation, hasFinishedSchedule, map]);

  return null;
};

export default Direction;
