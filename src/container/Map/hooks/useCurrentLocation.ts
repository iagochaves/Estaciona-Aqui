import { LatLngExpression, LocationEvent } from 'leaflet';
import { useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { useMapContext } from '../../../context/mapContext';

type CurrentLocationProps = {
  currentLocation: LocationEvent | undefined;
};

const useCurrentLocation = (): CurrentLocationProps => {
  const { currentLocation, setCurrentLocation } = useMapContext();

  const map = useMapEvents({
    locationfound: (location) => {
      (map as any).spin(false);

      const currentLocation = [
        location.latlng.lat,
        location.latlng.lng,
      ] as LatLngExpression;
      map.flyTo(currentLocation, 16);
      setCurrentLocation(location);
    },
  });
  useEffect(() => {
    (map as any).spin(true);
    map.locate();
  }, [map]);

  return {
    currentLocation,
  };
};

export default useCurrentLocation;
