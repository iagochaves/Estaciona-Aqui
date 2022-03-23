import { LogoutIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Logo from '../../../public/Logo.svg';
import DropDown from '../../components/DropDown';
import { MENU_TYPES } from '../../utils/constants';

const SideBar: React.FC = () => {
  const [currentSelected, setCurrentSelected] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const currentMenu = Object.values(MENU_TYPES).find(
      (menuType) => menuType.href === router.asPath
    );

    if (currentMenu) {
      setCurrentSelected(currentMenu.label);
    }
  }, [router.asPath]);

  const avatarUrl = session?.user?.image;
  const allMenuOptions = Object.values(MENU_TYPES);

  return (
    <aside className="h-screen flex flex-col bg-secondary">
      <Logo />
      <div className="flex flex-col flex-1 justify-center items-center">
        {allMenuOptions.map((Menu) => (
          <Link href={Menu.href} passHref key={Menu.label}>
            <div
              onClick={() => setCurrentSelected(Menu.label)}
              className={classNames(
                'w-full cursor-pointer flex items-center justify-center py-5 border-primary hover:bg-black',
                {
                  'bg-black border-primary border-l-[3px] transition-all duration-150':
                    currentSelected === Menu.label,
                }
              )}
            >
              <Menu.icon
                className={classNames('h-6 w-6', {
                  'text-white': currentSelected === Menu.label,
                  'text-notActive': currentSelected !== Menu.label,
                })}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="py-5 flex justify-center">
        <DropDown
          items={[
            {
              icon: <LogoutIcon className="h-5 w-5" aria-hidden="true" />,
              label: 'Sair',
              onActive: () => signOut({ callbackUrl: '/' }),
            },
          ]}
          customItemsPositioning="left-20 bottom-0"
          customTriggerElement={
            avatarUrl ? (
              <Image
                className="rounded-full cursor-pointer"
                src={avatarUrl}
                alt="User profile photo"
                width={48}
                height={48}
              />
            ) : (
              <div className="w-12 bg-gray-300 h-12 rounded-full" />
            )
          }
        />
      </div>
    </aside>
  );
};
export default SideBar;
