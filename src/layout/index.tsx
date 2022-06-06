import { ReactNode } from 'react';
import SideBar from './SideBar';

type AppLayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
