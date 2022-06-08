import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import ParkingLotCard from '../../components/ParkingLotCard';
import { TrashIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ParkingLotCardSkeleton from '../../components/ParkingLotCard/Skeleton';
import AddCard from '../../components/ParkingLotCard/AddCard';
import {
  ParkingLot,
  useDeleteParkingLot,
  useParkingLotsByEmail,
} from '../../hooks/useParkingLots';
import SuccessToast from '../../components/Toast/SuccessToast';
import Spinner from '../../components/Spinner';

type OwnerParkingsProps = {
  userEmail: string;
};

const OwnerParkings: React.FC<OwnerParkingsProps> = ({ userEmail }) => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [parkingLotSelected, setParkingLotSelected] = useState<number>();
  const [hasRemovedParkingLot, setHasRemovedParkingLot] = useState(false);

  const router = useRouter();
  const { data, isLoading: isLoadingParkingLots } =
    useParkingLotsByEmail(userEmail);
  const { mutate, isLoading } = useDeleteParkingLot();

  useEffect(() => {
    if (data) {
      setParkingLots(data.parkingLots);
    }
  }, [data]);

  const handleCancellation = () => {
    if (parkingLotSelected) {
      mutate(parkingLotSelected, {
        onSuccess: () => {
          setHasRemovedParkingLot(true);
          setIsOpen(false);
        },
      });
    }
  };

  return (
    <>
      <div className="flex space-x-3 overflow-auto">
        <AddCard />

        {!isLoadingParkingLots ? (
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
        title="Remover estacionamento"
        content={`Tem certeza que deseja remover ${
          parkingLots?.find(
            (parkingLot) => parkingLot.id === parkingLotSelected,
          )?.name
        } ?`}
        footer={
          <div className="flex-auto flex space-x-4">
            <button
              disabled={isLoading}
              type="button"
              className="flex disabled:bg-red-300 items-center justify-center h-10 px-6 font-semibold rounded-md bg-primary hover:bg-primaryAction transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              onClick={handleCancellation}
            >
              {isLoading ? (
                <>
                  <Spinner className="w-5 h-5 mr-3" />
                  Removendo...
                </>
              ) : (
                <>
                  Remover
                  <TrashIcon
                    className="ml-1 h-5 w-5 stroke-white"
                    aria-hidden="true"
                  />
                </>
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
      />

      <SuccessToast
        isActive={hasRemovedParkingLot}
        setIsActive={setHasRemovedParkingLot}
        message="Estacionamento removido com sucesso"
      />
    </>
  );
};

export default OwnerParkings;
