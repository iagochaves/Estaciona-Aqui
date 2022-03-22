import { ReactNode } from 'react';
import Logo from '../../public/Logo.svg';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <aside className="h-screen flex flex-col w-20 bg-secondary">
        <Logo />
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="w-full flex items-center justify-center py-5 bg-black border-l-[3px] border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          <div className="w-full flex items-center justify-center py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-notActive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>
      </aside>
      <div className="w-full">
        <header className="h-20 p-2 border-b-2">Header</header>

        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
