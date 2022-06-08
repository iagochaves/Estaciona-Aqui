import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import ParkingLotCard from '../../components/ParkingLotCard';
import { TrashIcon } from '@heroicons/react/outline';
import {
  Schedules,
  useDeleteSchedule,
  useSchedulesByEmail,
} from '../../hooks/useSchedules';
import ParkingLotCardSkeleton from '../../components/ParkingLotCard/Skeleton';
import Spinner from '../../components/Spinner';
import SuccessToast from '../../components/Toast/SuccessToast';

type ReservedParkingsProps = {
  userEmail: string;
};

const ReservedParkings: React.FC<ReservedParkingsProps> = ({ userEmail }) => {
  const [parkingLotsScheduled, setParkingLotsScheduled] = useState<Schedules[]>(
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [parkingLotSelected, setParkingLotSelected] = useState<number>();
  const [hasScheduleCancelled, setHasScheduleCancelled] = useState(false);

  const { data: schedulesData, isLoading: isSchedulesLoading } =
    useSchedulesByEmail(userEmail);
  const { mutate, isLoading: isScheduleBeingRemoved } = useDeleteSchedule();

  useEffect(() => {
    if (schedulesData) {
      setParkingLotsScheduled(schedulesData.schedules);
    }
  }, [schedulesData]);

  const handleCancellation = () => {
    if (parkingLotSelected) {
      mutate(parkingLotSelected, {
        onSuccess: () => {
          setIsOpen(false);
          setHasScheduleCancelled(true);
        },
      });
    }
  };

  if (isSchedulesLoading) {
    return (
      <div className="flex space-x-3 overflow-auto">
        <ParkingLotCardSkeleton />
        <ParkingLotCardSkeleton />
        <ParkingLotCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="flex space-x-3 overflow-auto">
        {parkingLotsScheduled.length ? (
          parkingLotsScheduled.map((scheduledParkingLot) => (
            <ParkingLotCard
              address={scheduledParkingLot.parking.address}
              id={scheduledParkingLot.id}
              phone={scheduledParkingLot.parking.phone}
              title={scheduledParkingLot.parking.name}
              type="reservation"
              onRemove={(id) => {
                setIsOpen(true);
                setParkingLotSelected(id);
              }}
              key={scheduledParkingLot.id}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center mb-12">
            <h2 className="text-lg ">
              Você não possui nenhuma reserva no momento!
            </h2>
          </div>
        )}
      </div>
      <Modal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Cancelar Reserva"
        content={`Tem certeza que deseja cancelar o agendamento com o estacionamento ${
          parkingLotsScheduled?.find(
            (parkingLotSchedule) =>
              parkingLotSchedule.id === parkingLotSelected,
          )?.parking.name
        } ?`}
        footer={
          <div className="flex-auto flex space-x-4">
            <button
              disabled={isScheduleBeingRemoved}
              type="button"
              className="flex disabled:bg-red-300 items-center justify-center h-10 px-6 font-semibold rounded-md bg-primary hover:bg-primaryAction transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              onClick={handleCancellation}
            >
              {isScheduleBeingRemoved ? (
                <>
                  <Spinner className="w-5 h-5 mr-3" />
                  Cancelando...
                </>
              ) : (
                <>
                  Cancelar reserva
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
        isActive={hasScheduleCancelled}
        setIsActive={setHasScheduleCancelled}
        message="Cancelamento feito com sucesso"
      />
    </>
  );
};

export default ReservedParkings;
