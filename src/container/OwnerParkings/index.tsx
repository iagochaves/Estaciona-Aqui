import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import ParkingLotCard from '../../components/ParkingLotCard';
import { TrashIcon, ViewGridAddIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ParkingLotCardSkeleton from '../../components/ParkingLotCard/Skeleton';
import AddCard from '../../components/ParkingLotCard/AddCard';
import { useSession } from 'next-auth/react';
import { ParkingLot, useParkingLots } from '../../hooks/useParkingLots';

const OwnerParkings: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [parkingLotSelected, setParkingLotSelected] = useState<
    number | string
  >();
  const { data: session } = useSession();

  const router = useRouter();
  const { isLoading, data } = useParkingLots();

  useEffect(() => {
    if (data) {
      setParkingLots(data.parkingLots);
    }
  }, [data]);

  const handleCancellation = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex space-x-3 overflow-auto">
        <AddCard />

        {parkingLots.length ? (
          <>
            {parkingLots.map((parkingLot) => (
              <ParkingLotCard
                totalParkingVacancy={parkingLot.totalParkingSpot}
                availableParkings={parkingLot.parkingSpotQuantity}
                address={parkingLot.address}
                title={parkingLot.name}
                phone={parkingLot.phone}
                type="owner"
                id={parkingLot.id}
                onEdit={(id) => {
                  router.push(`scheduled/edit/${id}`);
                }}
                onRemove={(id) => {
                  setIsOpen(true);
                  setParkingLotSelected(id);
                }}
                key={parkingLot.id}
              />
            ))}
          </>
        ) : (
          <>
            <ParkingLotCardSkeleton />
            <ParkingLotCardSkeleton />
            <ParkingLotCardSkeleton />
          </>
        )}
      </div>
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Cancelar Reserva"
        content="Tem certeza que deseja cancelar a reserva para Estacionamento X?"
        footer={
          <div className="flex-auto flex space-x-4">
            <button
              type="button"
              className="flex items-center justify-center h-10 px-6 font-semibold rounded-md bg-primary hover:bg-primaryAction transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              onClick={handleCancellation}
            >
              Sim, cancelar
              <TrashIcon
                className="ml-1 h-5 w-5 stroke-white"
                aria-hidden="true"
              />
            </button>
            <button
              className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              Voltar
            </button>
          </div>
        }
      />
    </>
  );
};

export default OwnerParkings;
