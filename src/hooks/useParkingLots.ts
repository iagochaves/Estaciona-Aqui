import { api, API_ROUTES } from '../services/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { ParkingLotScheme } from '../utils/YupSchema';

export type ParkingLot = {
  address: string;
  cep: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  ownerEmail: string;
  parkingSpotQuantity: number;
  phone: string;
  totalParkingSpot: number;
};

type GetParkingLotsResponse = {
  parkingLots: ParkingLot[];
};

type GetParkingLotResponse = {
  parkingLot: ParkingLot;
};

async function getParkingLots(): Promise<GetParkingLotsResponse> {
  const { data } = await api.get<ParkingLot[]>(API_ROUTES.parkingLots);

  return { parkingLots: data };
}

async function getParkingLot(
  parkingLotId: number,
): Promise<GetParkingLotResponse> {
  const { data } = await api.get<ParkingLot>(
    `${API_ROUTES.parkingLots}/${parkingLotId}`,
  );

  return { parkingLot: data };
}

async function getParkingLotsByEmail(
  email: string,
): Promise<GetParkingLotsResponse> {
  const { data } = await api.get<ParkingLot[]>(`${API_ROUTES.parkingLots}`, {
    params: {
      ownerEmail: email,
    },
  });

  return { parkingLots: data };
}

async function updateParkingLot(
  parkingLot: ParkingLotScheme,
  id: string,
): Promise<GetParkingLotResponse> {
  const { data } = await api.put<ParkingLot>(
    `${API_ROUTES.parkingLots}/${id}`,
    parkingLot,
  );

  return { parkingLot: data };
}

async function createParkingLot(
  parkingLot: ParkingLotScheme,
): Promise<GetParkingLotResponse> {
  const { data } = await api.post<ParkingLot>(
    `${API_ROUTES.parkingLots}`,
    parkingLot,
  );

  return { parkingLot: data };
}

async function deleteParkingLot(parkingLotId: number): Promise<boolean> {
  const { status } = await api.delete(
    `${API_ROUTES.parkingLots}/${parkingLotId}`,
  );

  return status === 204;
}

export const useParkingLots = () => {
  const { data, error, isLoading } = useQuery<GetParkingLotsResponse>(
    'parkings',
    () => getParkingLots(),
  );

  return { data, isLoading, error };
};

export const useParkingLotsByEmail = (email: string) => {
  const { data, error, isLoading } = useQuery<GetParkingLotsResponse>(
    ['parkings', email],
    () => getParkingLotsByEmail(email),
  );

  return { data, isLoading, error };
};

export const useParkingLot = (parkingLotId: number) => {
  const { data, error, isLoading } = useQuery(['parkings', parkingLotId], () =>
    getParkingLot(parkingLotId),
  );

  return { data, isLoading, error };
};

export const useMutateParkingLot = (id: string) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutate } = useMutation(
    (parkingLot: ParkingLotScheme) => updateParkingLot(parkingLot, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('parkings');
      },
    },
  );

  return { data, isLoading, error, mutate };
};

export const useCreateParkingLot = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutate } = useMutation(
    (parkingLot: ParkingLotScheme) => createParkingLot(parkingLot),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('parkings');
      },
    },
  );

  return { data, isLoading, error, mutate };
};

export const useDeleteParkingLot = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutate } = useMutation(
    (parkingLotId: number) => deleteParkingLot(parkingLotId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('parkings');
        queryClient.invalidateQueries('schedules');
      },
    },
  );

  return { data, isLoading, error, mutate };
};
