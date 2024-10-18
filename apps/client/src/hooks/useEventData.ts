import { useEffect } from 'react';
import { QueryClient, useQuery } from '@tanstack/react-query';

import { useToastStore } from '@/stores/toast-store';
import { EventData, TransactionResult, ToastType } from '@/types';
import { getEventData } from '@/endpoints';
import { QUERY_KEYS } from '@/constants';

export type UseEventDataOutput = {
  data: EventData | null;
  isLoading: boolean;
  refetchData: () => Promise<void>;
};

export const useEventData = (email: string | null): UseEventDataOutput => {
  const showToast = useToastStore((state) => state.showToast);
  const { data, isLoading, isError, error, refetch } =
    useQuery<TransactionResult<EventData> | null>({
      queryKey: [QUERY_KEYS.GET_EVENT_DATA, email],
      queryFn: () => {
        return email ? getEventData(email) : null;
      },
      enabled: !!email
    });

  useEffect(() => {
    if (isError) {
      showToast(error.message, ToastType.ERROR);
      console.log('USE_EVENT_DATA::ERROR:', JSON.stringify({ error }));
    }
  }, [isError]);

  const refetchData = async () => {
    await refetch();
  };

  console.log('EVENTS', data);

  return {
    data: data?.data ?? null,
    isLoading,
    refetchData
  };
};
