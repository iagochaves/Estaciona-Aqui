import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useMapContext } from '../../../../context/mapContext';
import { getDirections } from '../../../../services/apiMapBox';
import getDistance from '../../../../utils/getDistance';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import Location from '../Location';

type MapHandlerProps = {
  targetLocation: L.LatLng | undefined;
  hasFinishedSchedule: boolean;
  locations: L.LatLng[];
};

const MapHandler: React.FC<MapHandlerProps> = ({
  targetLocation,
  hasFinishedSchedule,
  locations,
}) => {
  const { currentLocation } = useCurrentLocation();
  const { setParkingLots } = useMapContext();
  const map = useMap();
  const [, setCurrentPathLayer] = useState<L.GeoJSON>();

  useEffect(() => {
    if (currentLocation) {
      const parkingLots = locations.map((location, index) => {
        const distanceFromMe = map.distance(
          {
            lat: currentLocation.latlng.lat,
            lng: currentLocation.latlng.lng,
          },
          location
        );
        return {
          title: `Estacionamento ${index + 1}`,
          description: 'Av. Doutor Malaquias 195',
          distance: getDistance(distanceFromMe),
          location,
        };
      });
      setParkingLots(parkingLots);
    }
  }, [currentLocation, locations, map, setParkingLots]);

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
