import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import GitHubIcon from '../../public/github.svg';
import LogoDark from '../../public/logo-dark.svg';
const GITHUB_PROVIDER = 'github';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Login: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div>
          <LogoDark className="mx-auto w-auto" />
          <h2 className="-mt-12 text-center text-3xl font-extrabold text-gray-900">
            Estaciona Aqui
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Área do usuário
          </p>
        </div>
        <div>
          <button
            onClick={() => signIn(GITHUB_PROVIDER, { callbackUrl: '/app' })}
            className="group relative w-full flex justify-center items-center space-x-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Login com GitHub
            <GitHubIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
