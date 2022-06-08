import { Form as FormFormik, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useParkingLot } from '../../hooks/useParkingLots';
import { ParkingLotScheme } from '../../utils/YupSchema';
import AutocompleteInput from '../AutocompleteInput';
import Input from '../Input';

interface IFormProps extends FormikProps<ParkingLotScheme> {
  slug: any;
}

const EditForm: React.FC<IFormProps> = ({ setFieldValue, values, slug }) => {
  const router = useRouter();
  const { data, error } = useParkingLot(slug!);

  useEffect(() => {
    if (error) {
      router.push('/scheduled');
    }
    if (data) {
      Object.entries(data.parkingLot).forEach(([key, value]) => {
        if (value) {
          setFieldValue(key, value);
        }
      });
    }
  }, [data, error, router, setFieldValue]);

  useEffect(() => {
    if (values.totalParkingSpot) {
      setFieldValue('parkingSpotQuantity', values.totalParkingSpot);
    }
  }, [setFieldValue, values.totalParkingSpot]);

  return (
    <FormFormik>
      <div className="mb-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <Input label="Nome do estacionamento" name="name" required />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Email"
              name="ownerEmail"
              autoComplete="email"
              type="email"
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              label="Total de vagas"
              name="totalParkingSpot"
              type="number"
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input
              disabled
              label="Vagas restantes"
              name="parkingSpotQuantity"
              type="number"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <Input label="Telefone" name="phone" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input label="CEP" name="cep" />
          </div>
          <div className="col-span-6">
            <AutocompleteInput
              fieldValue={values.address}
              setFieldValue={(value, latLng) => {
                setFieldValue('address', value);
                if (latLng.length) {
                  setFieldValue('latitude', latLng[1]);
                  setFieldValue('longitude', latLng[0]);
                }
              }}
              label="Endereço"
              name="address"
              required
            />
          </div>
        </div>
      </div>
      <div className="pt-6 space-x-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Salvar
        </button>
        <button
          type="button"
          className="inline-flex font-semibold justify-center py-2 px-4 border shadow-sm text-sm rounded-md text-slate-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={router.back}
        >
          Cancelar
        </button>
      </div>
    </FormFormik>
  );
};

export default EditForm;
