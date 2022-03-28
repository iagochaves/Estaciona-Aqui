import { LocationEvent } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

type CurrentLocationProps = {
  currentLocation: LocationEvent | undefined;
};

const useCurrentLocation = (): CurrentLocationProps => {
  const [currentLocation, setCurrentLocation] = useState<LocationEvent>();

  const map = useMapEvents({
    locationfound: (location) => {
      console.log('location found:', location);
      setCurrentLocation(location);
    },
  });
  useEffect(() => {
    map.locate();
  }, [map]);

  return {
    currentLocation,
  };
};

export default useCurrentLocation;
