import { LatLng, LocationEvent } from 'leaflet';
import React, { createContext, useContext, useState } from 'react';

interface MapContextData {
  currentLocation: LocationEvent | undefined;
  setCurrentLocation: (location: LocationEvent) => void;

  parkingLots: ParkingLotsProps[];
  setParkingLots: (parkingLots: ParkingLotsProps[]) => void;
}

interface ParkingLotsProps {
  title: string;
  description: string;
  distance: string;
  location: LatLng;
}

const MapContext = createContext<MapContextData>({} as MapContextData);

const MapProvider: React.FC = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<
    LocationEvent | undefined
  >();
  const [parkingLots, setParkingLots] = useState<ParkingLotsProps[]>([]);
  return (
    <MapContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        parkingLots,
        setParkingLots,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

function useMapContext(): MapContextData {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }

  return context;
}

export { MapProvider, useMapContext };
