import { ReactNode } from 'react';
import SideBar from './SideBar';

type AppLayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />

      <div className="p-3 w-full">{children}</div>
    </div>
  );
};

export default Layout;
