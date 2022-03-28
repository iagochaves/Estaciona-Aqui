import L from 'leaflet';

const carParkingLeafletIcon = L.icon({
  iconUrl: './parking-sign.svg',
  iconSize: [58, 68],
  iconAnchor: [30, 60],
  popupAnchor: [-0, -55],
});

export { carParkingLeafletIcon };
