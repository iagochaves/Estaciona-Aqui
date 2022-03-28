import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { memo, ReactNode, useState } from 'react';
import getClassNames from '../../utils/getClassNames';

type DropDownProps = {
  customItemsPositioning?: string;
  customTriggerElement?: ReactNode;
  label?: string;
  items: Array<ItemProps>;
};

type ItemProps = {
  icon: ReactNode;
  label: string;
  onActive: () => void;
};

const DropDown: React.FC<DropDownProps> = ({
  customTriggerElement,
  label,
  customItemsPositioning,
  items,
}) => {
  const [active, setActive] = useState(false);

  const handleToggleActive = () => setActive((prevActive) => !prevActive);
  return (
    <Menu as="div" className="relative inline-block text-left">
      {customTriggerElement ? (
        <Menu.Button as="div" onClick={() => handleToggleActive()}>
          {customTriggerElement}
        </Menu.Button>
      ) : (
        <Menu.Button
          onClick={() => handleToggleActive()}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      )}
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          unmount={!active}
          className={getClassNames(
            'origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10',
            customItemsPositioning ? customItemsPositioning : 'left-0'
          )}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={() => item.onActive()}
                    className={getClassNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'flex w-full px-4 py-2 text-sm'
                    )}
                  >
                    {item.label && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default memo(DropDown);
