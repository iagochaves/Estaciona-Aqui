import { LatLng, LocationEvent } from 'leaflet';
import React, { createContext, useContext, useState } from 'react';
import { ParkingLot } from '../hooks/useParkingLots';

interface MapContextData {
  currentLocation: LocationEvent | undefined;
  setCurrentLocation: (location: LocationEvent) => void;

  parkingLotsPanel: ParkingLotsProps[];
  setParkingLotsPanel: (parkingLots: ParkingLotsProps[]) => void;
}

interface ParkingLotsProps {
  title: string;
  description: string;
  distance: string;
  parkingLot: ParkingLot;
}

const MapContext = createContext<MapContextData>({} as MapContextData);

const MapProvider: React.FC = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<
    LocationEvent | undefined
  >();
  const [parkingLotsPanel, setParkingLotsPanel] = useState<ParkingLotsProps[]>(
    [],
  );
  return (
    <MapContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        parkingLotsPanel,
        setParkingLotsPanel,
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
