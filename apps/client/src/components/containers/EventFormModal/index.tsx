'use client';

import React from 'react';
import { Controller } from 'react-hook-form';
// import { DateValueType } from 'react-tailwindcss-datepicker';

import { Modal } from '@/components/ui';
import {
  TextInput,
  SelectInput,
  SelectItem,
  DatePicker,
  CheckBox,
  Button
} from '@/components/form';
import { useEventForm } from '@/hooks/useEventForm';
import { useEventModalStore } from '@/stores/event-modal-store';
import { CITIES, HOURS } from '@/constants';

const citiesOptions: SelectItem[] = CITIES.map((city) => ({
  label: city,
  value: city
}));

const hourOptions: SelectItem[] = HOURS.map((hour, index) => ({
  label: hour,
  value: index.toString()
}));

export const EventFormModal: React.FC = () => {
  const { errors, control, reset, register, watch, isLoading, onSubmit } =
    useEventForm();
  const { isOpen, hideModal } = useEventModalStore();

  const handleCloseModal = () => {
    reset();
    hideModal();
  };

  const isChecked = watch('fullDay');

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} title="Event Form">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <TextInput
          {...register('title')}
          label="Title"
          message="Event title require"
          error={!!errors.title}
        />
        <TextInput
          {...register('description')}
          label="Description"
          large
          message="Event description required"
          error={!!errors.description}
        />
        <SelectInput
          {...register('city')}
          label="City"
          options={citiesOptions}
          message="Event city required"
          error={!!errors.city}
        />
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <DatePicker
              label="Start Date"
              selected={field.value}
              onChange={(value) => field.onChange(value)}
              error={!!errors.startDate}
              message="Starting date required"
            />
          )}
        />
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <DatePicker
              label="End Date"
              selected={field.value}
              onChange={(value) => field.onChange(value)}
              error={!!errors.endDate}
              message="End date required"
            />
          )}
        />
        <SelectInput
          {...register('time')}
          label="Time"
          options={hourOptions}
          message="Event time required"
          error={!!errors.time}
        />
        <CheckBox
          {...register('fullDay')}
          label="Full Day"
          isChecked={isChecked}
        />
        <div>
          <Button type="submit" isLoading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
};
