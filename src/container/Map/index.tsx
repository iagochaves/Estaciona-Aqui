import L, { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { carParkingLeafletIcon } from '../../assets/carParkingLeafletIcon';
import Modal from '../../components/Modal';
import { staticTilesEndpoint } from '../../services/apiMapBox';
import DirectionsPanel from './components/DirectionsPanel';
import MapHandler from './components/MapHandler';

const RECIFE_COORDINATES = [-8.043096, -34.900519] as LatLngExpression;
const COORDINATES = [
  [-8.043096, -34.900519],
  [-8.044512, -34.907791],
  [-8.034802, -34.897137],
].map((coordinate) => L.latLng({ lat: coordinate[0], lng: coordinate[1] }));
const southWest = new L.LatLng(-33.750634, -73.982864);
const northEast = new L.LatLng(5.271805, -29.344376);
const maxBounds = new L.LatLngBounds(southWest, northEast);

const Map: React.FC = () => {
  const [targetLocation, setTargetLocation] = useState<L.LatLng>();
  const [isOpen, setIsOpen] = useState(false);
  const [hasFinishedSchedule, setHasFinishedSchedule] = useState(false);

  const onClickParkingLot = (coordinate: L.LatLng) => {
    setIsOpen(true);
    setHasFinishedSchedule(false);
    setTargetLocation(coordinate);
  };
  const onScheduleConfirmation = () => {
    setIsOpen(false);
    setHasFinishedSchedule(true);
  };
  return (
    <div className="relative h-full w-full">
      <DirectionsPanel
        locations={COORDINATES}
        onClickParkingLot={onClickParkingLot}
      />

      <MapContainer
        className="h-full w-full z-0"
        center={RECIFE_COORDINATES}
        zoom={13}
        maxBounds={maxBounds}
        maxBoundsViscosity={0.75}
      >
        <TileLayer url={staticTilesEndpoint} />
        <MapHandler
          locations={COORDINATES}
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
                onClickParkingLot(coordinate);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onConfirmation={onScheduleConfirmation}
      />
    </div>
  );
};

export default Map;
