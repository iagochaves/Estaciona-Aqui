import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { MapProvider } from '../../context/mapContext';

const Map = dynamic(() => import('../../container/Map'), {
  loading: () => <p>LOADING MAP...</p>,
  ssr: false,
});

const App: React.FC = () => {
  const { data } = useSession();
  return (
    <MapProvider>
      <Map userEmail={data?.user?.email!} />
    </MapProvider>
  );
};

export default App;
