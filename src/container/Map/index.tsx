import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { carParkingLeafletIcon } from '../../assets/carParkingLeafletIcon';
import { staticTilesEndpoint } from '../../services/apiMapBox';
import Direction from '../components/Direction';
import Location from '../components/Location';
import useCurrentLocation from '../hooks/useCurrentLocation';

const RECIFE_COORDINATES = [-8.043096, -34.900519] as LatLngExpression;

const MapHandler: React.FC = () => {
  const { currentLocation } = useCurrentLocation();

  return (
    <>
      <Location currentLocation={currentLocation} />
      <Direction
        currentLocation={currentLocation}
        endLocation={RECIFE_COORDINATES as number[]}
      />
    </>
  );
};

const Map: React.FC = () => {
  return (
    <MapContainer
      className="h-full w-full z-0"
      center={RECIFE_COORDINATES}
      zoom={13}
    >
      <TileLayer url={staticTilesEndpoint} />
      <MapHandler />
      <Marker position={RECIFE_COORDINATES} icon={carParkingLeafletIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
