import { signOut, useSession } from 'next-auth/react';
import AppLayout from '../../layout/AppLayout';

const App: React.FC = () => {
  const { data: session } = useSession();
  console.log('session', session);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold underline mb-4">Hello world!</h1>
      <button onClick={() => signOut({ callbackUrl: '/' })}>SignOut</button>
    </AppLayout>
  );
};

export default App;
