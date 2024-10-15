import { useMutation, UseMutateAsyncFunction } from '@tanstack/react-query';

import { useToastStore } from '@/stores/toast-store';
import { useUserStore } from '@/stores/user-store';
import { useEventData } from './useEventData';
import { createEventDb, updateEventDb } from '@/endpoints';
import {
  TransactionResult,
  TransactionResultType,
  CreateEventDto,
  UpdateEventDto,
  ToastType
} from '@/types';
import { QUERY_KEYS } from '@/constants';

export type UseMutateEventOutput = {
  isLoading: boolean;
  mutate: UseMutateAsyncFunction<
    TransactionResult<null>,
    Error,
    { id?: string; input: CreateEventDto | UpdateEventDto; isUpdate?: boolean }
  >;
};

export const useMutateEvent = (): UseMutateEventOutput => {
  const showToast = useToastStore((state) => state.showToast);
  const email = useUserStore((state) => state.email);
  const { refetchData } = useEventData(email);

  const mutation = useMutation<
    TransactionResult<null>,
    Error,
    { id?: string; input: CreateEventDto | UpdateEventDto; isUpdate?: boolean }
  >({
    mutationKey: [QUERY_KEYS.MUTATE_EVENT],
    mutationFn: ({ id, input, isUpdate }) => {
      if (isUpdate && id) {
        return updateEventDb(id, input as UpdateEventDto);
      }
      return createEventDb(input as CreateEventDto);
    },
    onSuccess: (result) => {
      if (result && result.type === TransactionResultType.SUCCESS) {
        showToast('Event created successfully', ToastType.SUCCESS);
        refetchData();
      }
    },
    onError: async (result) => {
      showToast(result.message, ToastType.ERROR);
      console.log(
        'MUTATE_EVENT::ERROR:',
        JSON.stringify({ result }, undefined, 2)
      );
    }
  });

  return { mutate: mutation.mutateAsync, isLoading: mutation.isPending };
};
