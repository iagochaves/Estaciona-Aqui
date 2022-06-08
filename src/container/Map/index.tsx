import L, { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { carParkingLeafletIcon } from '../../assets/carParkingLeafletIcon';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import { ParkingLot, useParkingLots } from '../../hooks/useParkingLots';
import { useCreateSchedule } from '../../hooks/useSchedules';
import { staticTilesEndpoint } from '../../services/apiMapBox';
import DirectionsPanel from './components/DirectionsPanel';
import MapHandler from './components/MapHandler';

const RECIFE_COORDINATES = [-8.043096, -34.900519] as LatLngExpression;

const southWest = new L.LatLng(-33.750634, -73.982864);
const northEast = new L.LatLng(5.271805, -29.344376);
const maxBounds = new L.LatLngBounds(southWest, northEast);

type MapProps = {
  userEmail: string;
};

const Map: React.FC<MapProps> = ({ userEmail }) => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [selectedParkingLot, setSelectedParkingLot] = useState<ParkingLot>();
  const [isOpen, setIsOpen] = useState(false);
  const [hasFinishedSchedule, setHasFinishedSchedule] = useState(false);

  const { data: parkingLotsData, isLoading: isLoadingParkingLots } =
    useParkingLots();
  const { mutate, isLoading: isCreatingSchedule } =
    useCreateSchedule(userEmail);

  useEffect(() => {
    if (parkingLotsData) {
      setParkingLots(parkingLotsData.parkingLots);
    }
  }, [parkingLotsData]);

  const onClickParkingLot = (parkingLot: ParkingLot) => {
    setIsOpen(true);
    setHasFinishedSchedule(false);
    setSelectedParkingLot(parkingLot);
  };
  const onScheduleConfirmation = () => {
    if (selectedParkingLot) {
      mutate(selectedParkingLot.id, {
        onSuccess: () => {
          setIsOpen(false);
          setHasFinishedSchedule(true);
        },
      });
    }
  };
  return (
    <div className="relative h-full w-full">
      <DirectionsPanel
        parkingLots={parkingLots}
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
          parkingLots={parkingLots}
          isLoading={isLoadingParkingLots}
          selectedParkingLot={selectedParkingLot}
          hasFinishedSchedule={hasFinishedSchedule}
        />
        {parkingLots.map((parkingLot, index) => {
          const coordinate = L.latLng({
            lat: +parkingLot.latitude,
            lng: +parkingLot.longitude,
          });
          return (
            <Marker
              position={coordinate}
              icon={carParkingLeafletIcon}
              key={index}
              eventHandlers={{
                click: () => {
                  onClickParkingLot(parkingLot);
                },
              }}
            ></Marker>
          );
        })}
      </MapContainer>
      <Modal
        title="Confirme sua reserva"
        content={
          <div>
            {'Deseja fazer uma reserva no '}
            <span className="font-bold">{selectedParkingLot?.name}</span>?
          </div>
        }
        footer={
          <div className="flex-auto flex space-x-4">
            <button
              disabled={isCreatingSchedule}
              type="button"
              className="flex disabled:bg-green-300 items-center justify-center h-10 px-6 font-semibold rounded-md bg-green-500 hover:bg-green-600 transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              onClick={onScheduleConfirmation}
            >
              {isCreatingSchedule ? (
                <>
                  <Spinner className="w-5 h-5 mr-3" />
                  Confirmando...
                </>
              ) : (
                <>Sim</>
              )}
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
          </div>
        }
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
};

export default Map;
