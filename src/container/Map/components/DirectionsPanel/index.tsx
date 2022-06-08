import { ArrowNarrowUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';
import { useMapContext } from '../../../../context/mapContext';
import { ParkingLot } from '../../../../hooks/useParkingLots';

type DirectionsPanelProps = {
  parkingLots: ParkingLot[];
  onClickParkingLot: (parkingLot: ParkingLot) => void;
};

type DropButtonProps = {
  isPanelExpanded: boolean;
  setIsPanelExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ListItemProps
  extends Pick<DirectionsPanelProps, 'onClickParkingLot'> {
  title: string;
  description: string;
  distance: string;
  parkingLot: ParkingLot;
}
const DirectionsPanel: React.FC<DirectionsPanelProps> = ({
  parkingLots,
  onClickParkingLot,
}) => {
  const { parkingLotsPanel } = useMapContext();
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const locationList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elementStyle = locationList!.current?.style;
    if (isPanelExpanded) {
      const maxHeightInPixels = 384;
      const currentHeight = parkingLots.length * 73;

      if (currentHeight >= maxHeightInPixels) {
        elementStyle!.maxHeight = `${maxHeightInPixels}px`;
      }

      elementStyle!.maxHeight = `${currentHeight}px`;

      return;
    }
    elementStyle!.maxHeight = '0px';
  }, [isPanelExpanded, parkingLots.length]);

  return (
    <div className="max-w-md w-full absolute top-8 right-10 z-10 px-8 py-5 ring-1 ring-slate-900/5 rounded-lg shadow-lg bg-white">
      <DropButton
        isPanelExpanded={isPanelExpanded}
        setIsPanelExpanded={setIsPanelExpanded}
      />
      <h3 className="text-xl leading-6 font-bold mb-1 pb-5 border-b text-slate-900">
        Estacionamentos{' '}
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary relative inline-block">
          <span className="relative text-white">Próximos</span>
        </span>
      </h3>
      <div
        className={classNames(
          'transition-all ease-out duration-300 overflow-hidden',
          {
            'h-96': !parkingLotsPanel.length,
            'max-h-0': parkingLotsPanel.length,
          },
        )}
        ref={locationList}
      >
        {!parkingLotsPanel.length && (
          <div className="flex justify-center items-center h-full">
            <Spinner className="w-10 h-10" />
          </div>
        )}
        <ul className="divide-y max-h-96 overflow-y-auto pr-1 divide-slate-200">
          {parkingLotsPanel.map((parkingLot) => (
            <ListItem
              key={parkingLot.title}
              title={parkingLot.title}
              description={parkingLot.description}
              distance={parkingLot.distance}
              parkingLot={parkingLot.parkingLot}
              onClickParkingLot={onClickParkingLot}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const DropButton: React.FC<DropButtonProps> = ({
  isPanelExpanded,
  setIsPanelExpanded,
}) => {
  return (
    <button
      className={classNames(
        'rotate-0	transform duration-300 absolute top-3 -ml-14 p-3 rounded-full bg-secondary hover:bg-black focus:outline-none',
        {
          'rotate-180 transform duration-300': !isPanelExpanded,
        },
      )}
      onClick={() =>
        setIsPanelExpanded((prevPanelExpanded) => !prevPanelExpanded)
      }
    >
      <ArrowNarrowUpIcon className="h-5 w-5 stroke-white" aria-hidden="true" />
    </button>
  );
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  distance,
  parkingLot,
  onClickParkingLot,
}) => {
  console.log('parking', parkingLot);
  return (
    <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-ellipsis max-w-[290px] overflow-hidden whitespace-nowrap font-extralight text-gray-600">
          {description}
        </p>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
          ~ {distance}
        </p>
        <div className="hidden group-hover:inline-flex">
          <Button onClick={() => onClickParkingLot(parkingLot)}>
            Localizar
          </Button>
        </div>
      </div>
    </li>
  );
};
export default DirectionsPanel;
