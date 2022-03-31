import dynamic from 'next/dynamic';
import { MapProvider } from '../../context/mapContext';

const Map = dynamic(() => import('../../container/Map'), {
  loading: () => <p>LOADING MAP...</p>,
  ssr: false,
});

const App: React.FC = () => {
  return (
    <MapProvider>
      <Map />
    </MapProvider>
  );
};

export default App;
