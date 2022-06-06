import { useState } from 'react';
import Modal from '../../components/Modal';
import ParkingLotCard from '../../components/ParkingLotCard';
import { TrashIcon } from '@heroicons/react/outline';

const ReservedParkings: React.FC = () => {
  const [parkingLots, setParkingLots] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [isOpen, setIsOpen] = useState(false);
  const [parkingLotSelected, setParkingLotSelected] = useState<number>();

  const handleCancellation = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex space-x-3 overflow-auto">
        {parkingLots.length ? (
          parkingLots.map((parkingLot) => (
            <ParkingLotCard
              type="reservation"
              id={parkingLot}
              onRemove={(id) => {
                setIsOpen(true);
                setParkingLotSelected(id);
              }}
              key={parkingLot}
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
        content="Tem certeza que deseja cancelar a reserva para Estacionamento X?"
        footer={
          <div className="flex-auto flex space-x-4">
            <button
              type="button"
              className="flex items-center justify-center h-10 px-6 font-semibold rounded-md bg-primary hover:bg-primaryAction transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              onClick={handleCancellation}
            >
              Cancelar
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

export default ReservedParkings;
