import * as yup from 'yup';
import { ParkingLot } from '../hooks/useParkingLots';

export type ParkingLotScheme = Omit<ParkingLot, 'id'>;

export const validateFormSchema = yup.object({
  address: yup.string().required('Endereço é obrigatório'),
  cep: yup.string(),
  name: yup.string().required('Nome é obrigatório'),
  ownerEmail: yup
    .string()
    .email('Email incorreto')
    .required('Email é obrigatório'),
  phone: yup.string(),
  totalParkingSpot: yup.number().required('Total de vagas é obrigatório'),
});
