import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import clsx from 'clsx';

export type SelectItem = {
  value: string;
  label: string;
};

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectItem[];
  label?: string;
  message?: string;
  error?: boolean;
  shrink?: boolean;
}

export const SelectInput = React.forwardRef<
  HTMLSelectElement,
  SelectInputProps
>((props, ref) => {
  const { options, label, message, error, shrink, ...rest } = props;

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
      <div className="relative w-fit cursor-pointer">
        <select
          {...rest}
          ref={ref}
          className={clsx(
            'min-h-11 border-2 px-2.5 rounded appearance-none cursor-pointer',
            {
              'border-gray-700': !error,
              'border-red-600': error,
              'min-w-64': !shrink,
              'w-auto': shrink
            }
          )}
        >
          {options.map((opt, index) => (
            <option key={`option_${opt.value}_${index}`} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="h-full w-10 absolute right-0 top-0 flex items-center justify-center">
          <FaChevronDown size="18px" />
        </div>
      </div>
      {message && error && (
        <div className="mt-1 min-h-3">
          <p className="text-xs text-red-600">{message}</p>
        </div>
      )}
    </label>
  );
});
