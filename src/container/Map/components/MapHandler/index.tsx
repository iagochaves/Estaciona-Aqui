import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useMapContext } from '../../../../context/mapContext';
import { ParkingLot } from '../../../../hooks/useParkingLots';
import { getDirections } from '../../../../services/apiMapBox';
import getDistance from '../../../../utils/getDistance';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import Location from '../Location';

type MapHandlerProps = {
  selectedParkingLot: ParkingLot | undefined;
  hasFinishedSchedule: boolean;
  parkingLots: ParkingLot[];
  isLoading: boolean;
};

const MapHandler: React.FC<MapHandlerProps> = ({
  isLoading,
  selectedParkingLot,
  hasFinishedSchedule,
  parkingLots,
}) => {
  const { currentLocation } = useCurrentLocation();
  const { setParkingLotsPanel } = useMapContext();
  const map = useMap();
  const [, setCurrentPathLayer] = useState<L.GeoJSON>();

  useEffect(() => {
    if (currentLocation) {
      const MAX_PARKINGS_LOTS_DISPLAY = 5;
      const allDistances = parkingLots.map((parkingLot) => {
        const distanceFromMe = map.distance(
          {
            lat: currentLocation.latlng.lat,
            lng: currentLocation.latlng.lng,
          },
          {
            lat: +parkingLot.latitude,
            lng: +parkingLot.longitude,
          },
        );
        return {
          title: parkingLot.name,
          description: parkingLot.address,
          parkingLot,
          distance: distanceFromMe,
        };
      });

      const sortedDistances = allDistances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, MAX_PARKINGS_LOTS_DISPLAY);
      const parkingLotsData = sortedDistances.map((parkingLot) => ({
        ...parkingLot,
        distance: getDistance(parkingLot.distance),
      }));

      setParkingLotsPanel(parkingLotsData);
    }
  }, [currentLocation, map, parkingLots, setParkingLotsPanel]);

  useEffect(() => {
    if (isLoading) {
      (map as any).spin(true);
      return;
    }
    (map as any).spin(false);
  }, [isLoading, map]);

  useEffect(() => {
    const getMapDirections = async () => {
      if (currentLocation && selectedParkingLot && hasFinishedSchedule) {
        (map as any).spin(true);
        const startPoint = [
          currentLocation.latlng.lat,
          currentLocation.latlng.lng,
        ];
        const directions = await getDirections(startPoint, [
          +selectedParkingLot.latitude,
          +selectedParkingLot.longitude,
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
          map.fitBounds([
            startPoint,
            [+selectedParkingLot.latitude, +selectedParkingLot.longitude],
          ] as any);
        }
      }
    };
    getMapDirections();
  }, [currentLocation, hasFinishedSchedule, map, selectedParkingLot]);

  return (
    <>
      <Location currentLocation={currentLocation} />
    </>
  );
};

export default MapHandler;
