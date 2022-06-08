import Image from 'next/image';
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import AvailableParkingsLabel from '../AvailableParkingsLabel';
import dayjs from 'dayjs';

type ParkingLotCardProps = {
  type: 'reservation' | 'owner';
  id: number;
  title: string;
  phone: string;
  address: string;
  totalParkingVacancy?: number;
  availableParkings?: number;
  date?: number;
  onRemove: (id: number) => void;
  onEdit?: (id: number) => void;
};

const ParkingLotCard: React.FC<ParkingLotCardProps> = ({
  address,
  date,
  id,
  onRemove,
  title,
  phone,
  type,
  onEdit,
  totalParkingVacancy,
  availableParkings,
}) => {
  return (
    <>
      <div className="flex flex-col border rounded-md max-w-xs shrink-0 w-full">
        <div className="flex-none w-full relative">
          <Image
            src="/parking-lot-background.jpg"
            alt="Parking Lot"
            width="100%"
            height="40%"
            layout="responsive"
            className="w-full h-full object-cover rounded-t-md"
            loading="lazy"
          />
        </div>
        <div className="flex-auto px-6 pt-4 pb-1">
          <div>
            <h1 className="text-ellipsis overflow-hidden whitespace-nowrap flex-auto text-lg font-semibold text-slate-900">
              {title}
            </h1>
            {type === 'reservation' && (
              <div className="text-sm font-semibold text-slate-500">
                {dayjs(date).format('DD/MM/YYYY')}
              </div>
            )}
            {type === 'owner' && totalParkingVacancy && availableParkings && (
              <AvailableParkingsLabel
                totalParkingVacancy={totalParkingVacancy}
                availableParkings={availableParkings}
              />
            )}
            <div className="text-ellipsis overflow-hidden whitespace-nowrap text-sm font-medium text-slate-700 mt-2">
              {address}
            </div>
            {phone && (
              <p className="text-sm text-slate-700 mt-2">{`Contato: ${phone}`}</p>
            )}
          </div>
        </div>
        <div className="flex px-6 w-full space-x-3 my-4 text-sm font-medium">
          {type === 'owner' && (
            <button
              className="flex justify-center w-full font-semibold rounded-md transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={() => onEdit!(id)}
            >
              <PencilAltIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <button
            className={classNames(
              ' font-semibold rounded-md  text-primary transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2',
              {
                'flex justify-center w-full': type === 'owner',
              },
            )}
            onClick={() => onRemove(id)}
          >
            {type === 'owner' ? (
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              'Cancelar Reserva'
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default ParkingLotCard;
