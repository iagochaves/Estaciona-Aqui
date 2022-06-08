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

type GetScheduleResponse = {
  schedule: Schedules;
};

async function getSchedulesLotsByEmail(
  email: string,
): Promise<GetSchedulesResponse> {
  const { data } = await api.get<Schedules[]>(`${API_ROUTES.schedules}`, {
    params: {
      email: email,
    },
  });

  return { schedules: data };
}

async function deleteSchedule(scheduleId: number): Promise<boolean> {
  const { status } = await api.delete(`${API_ROUTES.schedules}/${scheduleId}`);

  return status === 204;
}

async function createSchedule(
  userEmail: string,
  parkingLotId: number,
): Promise<GetScheduleResponse> {
  const { data } = await api.post<Schedules>(`${API_ROUTES.schedules}`, {
    email: userEmail,
    parking: {
      id: parkingLotId,
    },
  });

  return { schedule: data };
}

export const useSchedulesByEmail = (email: string) => {
  const { data, error, isLoading } = useQuery<GetSchedulesResponse>(
    ['schedules', email],
    () => getSchedulesLotsByEmail(email),
  );

  return { data, isLoading, error };
};

export const useCreateSchedule = (userEmail: string) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, mutate } = useMutation(
    (parkingLotId: number) => createSchedule(userEmail, parkingLotId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('schedules');
      },
    },
  );

  return { data, isLoading, error, mutate };
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
