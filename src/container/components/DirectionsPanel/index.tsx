import { ArrowNarrowUpIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import L, { LocationEvent } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import Button from '../../../components/Button';

type DirectionProps = {
  currentLocation: LocationEvent | undefined;
  endLocation: L.LatLng | undefined;
  hasFinishedSchedule: boolean;
};

const DirectionsPanel: React.FC = () => {
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const locationList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPanelExpanded) {
      locationList!.current?.classList.replace('max-h-0', 'max-h-96');

      return;
    }
    locationList!.current?.classList.replace('max-h-96', 'max-h-0');
  }, [isPanelExpanded]);

  return (
    <div className="max-w-md w-full absolute top-8 right-10 z-10 px-8 py-5 ring-1 ring-slate-900/5 rounded-lg shadow-lg bg-white">
      <button
        className={classNames(
          'rotate-0	transform duration-300 absolute top-3 -ml-14 p-3 rounded-full bg-secondary hover:bg-black focus:outline-none',
          {
            'rotate-180 transform duration-300': !isPanelExpanded,
          }
        )}
        onClick={() =>
          setIsPanelExpanded((prevPanelExpanded) => !prevPanelExpanded)
        }
      >
        <ArrowNarrowUpIcon
          className="h-5 w-5 stroke-white"
          aria-hidden="true"
        />
      </button>
      <h3 className="text-xl leading-6 font-bold mb-1 pb-5 border-b text-slate-900">
        Estacionamentos{' '}
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-primary relative inline-block">
          <span className="relative text-white">Próximos</span>
        </span>
      </h3>

      <div
        className="transition-all ease-out duration-300 max-h-0 overflow-hidden"
        ref={locationList}
      >
        <ul className="divide-y max-h-96 overflow-y-auto pr-1 divide-slate-200">
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
          <li className="group pt-4 pb-3 last:pb-0 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Estacionamento 1
              </h4>
              <p className="font-extralight text-gray-600">
                Av. Doutor Malaquias 195
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 italic group-hover:hidden">
                ~ 390m
              </p>
              <div className="hidden group-hover:inline-flex">
                <Button>Localizar</Button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DirectionsPanel;
