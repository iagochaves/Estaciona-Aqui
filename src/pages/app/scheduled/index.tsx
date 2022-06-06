import ParkingLotCard from '../../../components/ParkingLotCard';
import OwnerParkings from '../../../container/OwnerParkings';
import ReservedParkings from '../../../container/ReservedParkings';

const Scheduled: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl lg:text-3xl font-bold mb-4">Vagas Reservadas</h2>
      <ReservedParkings />
      <h2 className="text-xl lg:text-3xl mt-4 font-bold mb-4">
        Estacionamentos Cadastrados
      </h2>
      <OwnerParkings />
    </div>
  );
};

export default Scheduled;
