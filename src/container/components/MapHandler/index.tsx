import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { getDirections } from '../../../services/apiMapBox';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import Location from '../Location';

type MapHandlerProps = {
  targetLocation: L.LatLng | undefined;
  hasFinishedSchedule: boolean;
};

const MapHandler: React.FC<MapHandlerProps> = ({
  targetLocation,
  hasFinishedSchedule,
}) => {
  const { currentLocation } = useCurrentLocation();
  const map = useMap();
  const [, setCurrentPathLayer] = useState<L.GeoJSON>();

  useEffect(() => {
    const getMapDirections = async () => {
      if (currentLocation && targetLocation && hasFinishedSchedule) {
        (map as any).spin(true);
        const startPoint = [
          currentLocation.latlng.lat,
          currentLocation.latlng.lng,
        ];
        const directions = await getDirections(startPoint, [
          targetLocation.lat,
          targetLocation.lng,
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
          map.fitBounds([startPoint, targetLocation] as any);
        }
      }
    };
    getMapDirections();
  }, [currentLocation, hasFinishedSchedule, map, targetLocation]);

  return (
    <>
      <Location currentLocation={currentLocation} />
    </>
  );
};

export default MapHandler;
