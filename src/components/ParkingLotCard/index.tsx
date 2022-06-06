import Image from 'next/image';
import { TrashIcon, PencilAltIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

type ParkingLotCardProps = {
  type: 'reservation' | 'owner';
  id: number;
  onRemove: (id: number) => void;
  onEdit?: (id: number) => void;
};

const ParkingLotCard: React.FC<ParkingLotCardProps> = ({
  id,
  onRemove,
  type,
  onEdit,
}) => {
  return (
    <>
      <div className="flex flex-col border rounded-md max-w-xs shrink-0 w-full ">
        <div className="flex-none w-full relative">
          <Image
            src="/parking-lot-background.jpg"
            alt="Parking Lot"
            width="100%"
            height="40%"
            layout="responsive"
            className=" w-full h-full object-cover rounded-t-md"
            loading="lazy"
          />
        </div>
        <div className="flex-auto px-6 pt-4 pb-1">
          <div>
            <h1 className="flex-auto text-lg font-semibold text-slate-900">
              Estacionamento 1
            </h1>
            <div className="text-sm font-semibold text-slate-500">
              05/06/2022
            </div>
            <div className="break-all  text-sm font-medium text-slate-700 mt-2">
              {id}
            </div>
            <p className="text-sm text-slate-700 mt-2">Contato: 55550123</p>
          </div>

          <div className="flex w-full space-x-3 mt-4 mb-3 text-sm font-medium">
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
      </div>
    </>
  );
};

export default ParkingLotCard;
