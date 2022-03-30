import { LatLngExpression, LocationEvent } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

type CurrentLocationProps = {
  currentLocation: LocationEvent | undefined;
};

const useCurrentLocation = (): CurrentLocationProps => {
  const [currentLocation, setCurrentLocation] = useState<LocationEvent>();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const map = useMapEvents({
    locationfound: (location) => {
      (map as any).spin(false);
      console.log('location found:', location);
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
