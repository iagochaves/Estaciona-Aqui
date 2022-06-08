import { LocationEvent } from 'leaflet';
import { memo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { carLeafletIcon } from '../../../../assets/carLeafletIcon';

type LocationProps = {
  currentLocation: LocationEvent | undefined;
};

const Location: React.FC<LocationProps> = ({ currentLocation }) => {
  if (currentLocation) {
    return (
      <Marker
        icon={carLeafletIcon}
        position={[currentLocation.latlng.lat, currentLocation.latlng.lng]}
      >
        <Popup>
          <p className="font-bold">Você está aqui!</p>
        </Popup>
      </Marker>
    );
  }
  return null;
};

export default memo(Location);
