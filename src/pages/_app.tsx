import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import Layout from '../layout';
import '../styles/global.css';
import { MENU_TYPES } from '../utils/constants';

if (typeof window !== 'undefined') {
  require('leaflet/dist/leaflet.css');
  require('../assets/css/Control.Loading.css');
  require('../assets/files/Control.Loading.js');
  require('../assets/css/Control.FullScreen.css');
  require('../assets/files/Control.FullScreen.js');
  require('leaflet-spin');
  require('../../node_modules/spin.js/spin.css');
  // require('leaflet.markercluster/dist/MarkerCluster.css');
  // require('leaflet.markercluster/dist/MarkerCluster.Default.css');
  // require('leaflet.markercluster/dist/leaflet.markercluster.js');
}

const AppLayout: React.FC = ({ children }) => {
  return <Layout>{children}</Layout>;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  const allMenuRoutes = Object.values(MENU_TYPES).map((menu) => menu.href);

  return (
    <>
      <Head>
        <title>Estaciona Aqui</title>
      </Head>
      <NextNProgress
        color="#DC1637"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <SessionProvider session={session}>
        {allMenuRoutes.includes(router.asPath) ? (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </>
  );
}

export default MyApp;
