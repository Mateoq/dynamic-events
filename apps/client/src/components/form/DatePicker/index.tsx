import React from 'react';
import clsx from 'clsx';
import { FaCalendar } from 'react-icons/fa6';
// import Datepicker, { DatepickerType } from 'react-tailwindcss-datepicker';
import DDatePicker, {
  DatePickerProps as DDatePickerProps
} from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export type DatePickerProps = DDatePickerProps & {
  label?: string;
  message?: string;
  error?: boolean;
  large?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, message, error, large, ...rest } = props;
  console.log('VALUE_DATE', rest.selected);

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
        <DDatePicker
          {...rest}
          showIcon
          icon={<FaCalendar className="text-gray-800 text-lg mt-1" />}
          className={clsx(
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
