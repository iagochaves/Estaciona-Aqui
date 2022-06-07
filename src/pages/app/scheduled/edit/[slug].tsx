import { useRouter } from 'next/router';
import { Formik } from 'formik';
import {
  ParkingLotScheme,
  validateFormSchema,
} from '../../../../utils/YupSchema';
import { useMutateParkingLot } from '../../../../hooks/useParkingLots';
import SuccessToast from '../../../../components/Toast/SuccessToast';
import { useState } from 'react';
import EditForm from '../../../../components/Form/EditForm';
import ErrorToast from '../../../../components/Toast/ErrorToast';

const INITIAL_VALUES: ParkingLotScheme = {
  address: '',
  cep: '',
  name: '',
  ownerEmail: '',
  parkingSpotQuantity: 0,
  phone: '',
  totalParkingSpot: 0,
  latitude: '',
  longitude: '',
};

const EditParkingLot: React.FC = () => {
  const [hasEditedParkingLot, setHasEditedParkingLot] = useState(false);
  const [hasEditedParkingLotError, setHasEditedParkingLotError] =
    useState(false);
  const router = useRouter();
  const { slug }: any = router.query;
  const { mutate } = useMutateParkingLot(slug);

  const handleSaveForm = (formData: ParkingLotScheme) => {
    mutate(formData, {
      onSuccess: () => {
        setHasEditedParkingLot(true);
        router.back();
      },
      onError: () => {
        setHasEditedParkingLotError(true);
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-4">
        <div className="sm:border sm:rounded-md p-1 lg:p-6 sm:shadow">
          <div className="mb-8 lg:mb-12">
            <h2 className="font-bold text-xl leading-6">
              Editar Estacionamento
            </h2>
          </div>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validateFormSchema}
            onSubmit={handleSaveForm}
          >
            {(formikProps) => <EditForm slug={slug} {...formikProps} />}
          </Formik>
        </div>
        <SuccessToast
          isActive={hasEditedParkingLot}
          setIsActive={setHasEditedParkingLot}
          message="Estacionamento editado com sucesso"
        />
        <ErrorToast
          isActive={hasEditedParkingLotError}
          setIsActive={setHasEditedParkingLotError}
          message="Erro ao atualizar o estacionamento, tente novamente"
        />
      </div>
    </div>
  );
};

export default EditParkingLot;
