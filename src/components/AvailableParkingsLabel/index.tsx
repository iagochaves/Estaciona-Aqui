import classNames from 'classnames';
import { useEffect, useState } from 'react';

type AvailableParkingsLabelProps = {
  totalParkingVacancy: number;
  availableParkings: number;
};

const getColor = (value: number) => {
  if (value >= 0 && value < 20) return 'bg-red-200 text-red-900';
  if (value >= 20 && value < 50) return 'bg-orange-200 text-orange-900';
  if (value >= 50 && value < 75) return 'bg-yellow-200 text-yellow-900';
  return 'bg-green-200 text-green-900';
};

const AvailableParkingsLabel: React.FC<AvailableParkingsLabelProps> = ({
  totalParkingVacancy,
  availableParkings,
}) => {
  const [activeColors, setActiveColors] = useState('');

  useEffect(() => {
    const availablePercent = (availableParkings / totalParkingVacancy) * 100;
    setActiveColors(getColor(availablePercent));
  }, [availableParkings, totalParkingVacancy]);

  return (
    <div
      className={classNames(
        'px-1 text-xs font-bold rounded-sm whitespace-nowrap inline-block align-middle text-green-900',
        activeColors,
      )}
    >
      {`${availableParkings}/${totalParkingVacancy} vagas restantes`}
    </div>
  );
};

export default AvailableParkingsLabel;
