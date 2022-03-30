import L, { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { carParkingLeafletIcon } from '../../assets/carParkingLeafletIcon';
import Modal from '../../components/Modal';
import { staticTilesEndpoint } from '../../services/apiMapBox';
import Direction from '../components/Direction';
import Location from '../components/Location';
import useCurrentLocation from '../hooks/useCurrentLocation';

type MapHandlerProps = {
  targetLocation: L.LatLng | undefined;
  hasFinishedSchedule: boolean;
};

const RECIFE_COORDINATES = [-8.043096, -34.900519] as LatLngExpression;
const COORDINATES = [
  [-8.043096, -34.900519],
  [-8.044512, -34.907791],
  [-8.034802, -34.897137],
].map((coordinate) => L.latLng({ lat: coordinate[0], lng: coordinate[1] }));
const southWest = new L.LatLng(-33.750634, -73.982864);
const northEast = new L.LatLng(5.271805, -29.344376);
const maxBounds = new L.LatLngBounds(southWest, northEast);

const MapHandler: React.FC<MapHandlerProps> = ({
  targetLocation,
  hasFinishedSchedule,
}) => {
  const { currentLocation } = useCurrentLocation();

  return (
    <>
      <Location currentLocation={currentLocation} />
      <Direction
        currentLocation={currentLocation}
        endLocation={targetLocation}
        hasFinishedSchedule={hasFinishedSchedule}
      />
    </>
  );
};

const Map: React.FC = () => {
  const [targetLocation, setTargetLocation] = useState<L.LatLng>();
  const [isOpen, setIsOpen] = useState(false);
  const [hasFinishedSchedule, setHasFinishedSchedule] = useState(false);

  const onScheduleConfirmation = () => {
    setIsOpen(false);
    setHasFinishedSchedule(true);
  };
  return (
    <>
      <MapContainer
        className="h-full w-full z-0"
        center={RECIFE_COORDINATES}
        zoom={13}
        maxBounds={maxBounds}
        maxBoundsViscosity={0.75}
      >
        <TileLayer url={staticTilesEndpoint} />
        <MapHandler
          targetLocation={targetLocation}
          hasFinishedSchedule={hasFinishedSchedule}
        />
        {COORDINATES.map((coordinate, index) => (
          <Marker
            position={coordinate}
            icon={carParkingLeafletIcon}
            key={index}
            eventHandlers={{
              click: () => {
                setIsOpen(true);
                setHasFinishedSchedule(false);
                setTargetLocation(coordinate);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onScheduleConfirmation={onScheduleConfirmation}
      />
    </>
  );
};

export default Map;
