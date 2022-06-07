import { useRouter } from 'next/router';
import Input from '../../../../components/Input';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { FeatureProps } from '../../../../services/apiMapBox';
import AutocompleteInput from '../../../../components/AutocompleteInput';
import {
  ParkingLotScheme,
  validateFormSchema,
} from '../../../../utils/YupSchema';
import CreateForm from '../../../../components/Form/CreateForm';
import SuccessToast from '../../../../components/Toast/SuccessToast';
import ErrorToast from '../../../../components/Toast/ErrorToast';
import { useCreateParkingLot } from '../../../../hooks/useParkingLots';

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

const CreateParkingLot: React.FC = () => {
  const router = useRouter();
  const [hasCreatedParkingLot, setHasCreatedParkingLot] = useState(false);
  const [hasCreatedParkingLotError, setHasCreatedParkingLotError] =
    useState(false);

  const { mutate } = useCreateParkingLot();

  const handleSaveForm = (formData: ParkingLotScheme) => {
    mutate(formData, {
      onSuccess: () => {
        setHasCreatedParkingLot(true);
        router.back();
      },
      onError: () => {
        setHasCreatedParkingLotError(true);
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-4">
        <div className="sm:border sm:rounded-md p-1 lg:p-6 sm:shadow">
          <div className="mb-8 lg:mb-12">
            <h2 className="font-bold text-xl leading-6">
              Criar Estacionamento
            </h2>
          </div>
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={validateFormSchema}
            onSubmit={handleSaveForm}
          >
            {(formikProps) => <CreateForm {...formikProps} />}
          </Formik>
        </div>
        <SuccessToast
          isActive={hasCreatedParkingLot}
          setIsActive={setHasCreatedParkingLot}
          message="Estacionamento editado com sucesso"
        />
        <ErrorToast
          isActive={hasCreatedParkingLotError}
          setIsActive={setHasCreatedParkingLotError}
          message="Erro ao atualizar o estacionamento, tente novamente"
        />
      </div>
    </div>
  );
};

export default CreateParkingLot;
