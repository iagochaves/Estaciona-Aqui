import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../container/Map'), {
  loading: () => <p>LOADING MAP...</p>,
  ssr: false,
});

const App: React.FC = () => {
  return <Map />;
};

export default App;
