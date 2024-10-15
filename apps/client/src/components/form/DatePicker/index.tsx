import React from 'react';
import clsx from 'clsx';
import Datepicker, { DatepickerType } from 'react-tailwindcss-datepicker';

export interface DatePickerProps extends DatepickerType {
  label?: string;
  message?: string;
  error?: boolean;
  large?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, message, error, large, ...rest } = props;
  console.log('VALUE', rest.value);

  return (
    <label className="flex flex-col w-fit">
      {label && (
        <span
          className={clsx('text-xs mb-1 font-semibold uppercase', {
            'text-gray-900': !error,
            'text-red-600': error
          })}
        >
          {label}
        </span>
      )}
      <div className="relative w-fit">
        <Datepicker
          {...rest}
          asSingle
          readOnly
          inputClassName={clsx(
            'min-w-64 min-h-11 border-2 px-2.5 rounded appearance-none cursor-pointer',
            {
              'border-gray-700': !error,
              'border-red-600': error,
              'w-96': large
            }
          )}
        />
      </div>
      {message && error && (
        <div className="mt-1 min-h-3">
          <p className="text-xs text-red-600">{message}</p>
        </div>
      )}
    </label>
  );
};
