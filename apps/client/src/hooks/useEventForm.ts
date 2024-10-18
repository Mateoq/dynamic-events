import { useCallback, useEffect, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormReset,
  useForm
} from 'react-hook-form';

import { useMutateEvent } from './useMutateEvent';
import { useUserStore } from '@/stores/user-store';
import { useEventData } from './useEventData';
import { useEventModalStore } from '@/stores/event-modal-store';
import { CreateEventDto } from '@/types';

const schema = z.object({
  title: z.string().min(1, 'Title must not be empty'),
  description: z.string().min(1, 'Description must not be empty'),
  city: z.string().min(1, 'City must not be empty'),
  startDate: z.date(),
  endDate: z.date(),
  time: z.string(),
  fullDay: z.boolean().optional()
});

type InputsType = z.infer<typeof schema>;

export type UseEventFormOutput = {
  errors: FieldErrors<InputsType>;
  isLoading: boolean;
  control: Control<InputsType, any>;
  reset: UseFormReset<InputsType>;
  watch: UseFormWatch<InputsType>;
  register: UseFormRegister<InputsType>;
  onSubmit(): Promise<void>;
};

export const useEventForm = (): UseEventFormOutput => {
  const { mutate, isLoading } = useMutateEvent();
  const { id: userId, email } = useUserStore();
  const { data: eventData } = useEventData(email);
  const { eventId, hideModal, isOpen } = useEventModalStore();
  const formFilledDefault = useRef<boolean>(false);
  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors }
  } = useForm<InputsType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      fullDay: false
    }
  });

  const submitHandler = useCallback(
    async (inputs: InputsType) => {
      console.log('INPUTS', inputs);

      const dto: CreateEventDto = {
        title: inputs.title,
        description: inputs.description,
        city: inputs.city,
        startYear: inputs.startDate.getFullYear(),
        startMonth: inputs.startDate.getMonth(),
        startDate: inputs.startDate.getDate(),
        endYear: inputs.endDate.getFullYear(),
        endMonth: inputs.endDate.getMonth(),
        endDate: inputs.endDate.getDate(),
        time: parseInt(inputs.time),
        fullDay: !!inputs.fullDay,
        userId: userId!
      };

      const result = await mutate({
        id: eventId ?? undefined,
        input: dto,
        isUpdate: !!eventId
      });

      console.log('SUBMIT_RESULT', result);

      if (result) {
        reset();
        hideModal();
      }
    },
    [eventId]
  );

  useEffect(() => {
    if (!formFilledDefault.current) {
      if (eventId && eventData && isOpen) {
        const event = eventData.events[eventId];
        reset({
          title: event.title,
          description: event.description,
          city: event.city,
          startDate: new Date(
            event.startYear,
            event.startMonth,
            event.startDate
          ),
          endDate: new Date(event.endYear, event.endMonth, event.endDate),
          time: event.time.toString(),
          fullDay: event.fullDay
        });
      }
    }
  }, [eventId, eventData, isOpen]);

  return {
    errors,
    register,
    control,
    reset,
    watch,
    isLoading,
    onSubmit: handleSubmit(submitHandler)
  };
};
