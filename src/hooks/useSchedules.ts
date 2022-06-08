import { useMutation, useQuery, useQueryClient } from 'react-query';
import { api, API_ROUTES } from '../services/api';
import { ParkingLot } from './useParkingLots';

export type Schedules = {
  id: number;
  email: string;
  parking: ParkingLot;
  bookingDate: Date;
};

type GetSchedulesResponse = {
  schedules: Schedules[];
};

async function getSchedulesLotsByEmail(
  email: string,
): Promise<GetSchedulesResponse> {
  const { data } = await api.get<Schedules[]>(`${API_ROUTES.schedules}`, {
    params: {
      ownerEmail: email,
    },
  });

  return { schedules: data };
}

async function deleteSchedule(scheduleId: number): Promise<boolean> {
  const { status } = await api.delete(`${API_ROUTES.schedules}/${scheduleId}`);

  return status === 204;
}

export const useSchedulesByEmail = (email: string) => {
  const { data, error, isLoading } = useQuery<GetSchedulesResponse>(
    ['schedules', email],
    () => getSchedulesLotsByEmail(email),
  );

  return { data, isLoading, error };
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutate } = useMutation(
    (scheduleId: number) => deleteSchedule(scheduleId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schedules');
      },
    },
  );

  return { data, isLoading, error, mutate };
};
