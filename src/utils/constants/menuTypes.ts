import { KeyIcon, LocationMarkerIcon } from '@heroicons/react/outline';

export type MenuTypesProps = {
  [menu: string]: {
    icon: React.ComponentType<any>;
    label: string;
    href: string;
  };
};

export const MENU_TYPES: MenuTypesProps = {
  home: {
    href: '/app',
    icon: LocationMarkerIcon,
    label: 'Home',
  },
  scheduledLocations: {
    href: '/app/scheduled',
    icon: KeyIcon,
    label: 'Scheduled Locations',
  },
};
