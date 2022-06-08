import { useSession } from 'next-auth/react';
import ParkingLotCard from '../../../components/ParkingLotCard';
import OwnerParkings from '../../../container/OwnerParkings';
import ReservedParkings from '../../../container/ReservedParkings';

const Scheduled: React.FC = () => {
  const { data } = useSession();
  return (
    <div className="p-8">
      <h2 className="text-xl lg:text-3xl font-bold mb-4">Vagas Reservadas</h2>
      <ReservedParkings userEmail={data?.user?.email!} />
      <h2 className="text-xl lg:text-3xl mt-4 font-bold mb-4">
        Estacionamentos Cadastrados
      </h2>
      <OwnerParkings userEmail={data?.user?.email!} />
    </div>
  );
};

export default Scheduled;
