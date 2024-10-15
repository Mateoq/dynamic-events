import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';

export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isChecked?: boolean;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  (props, ref) => {
    const { label, isChecked, ...rest } = props;

    return (
      <label className="flex flex-col">
        {label && (
          <span className="text-xs mb-1 font-semibold uppercase text-gray-900">
            {label}
          </span>
        )}
        <div className="h-7 w-7 border-2 px-2.5 rounded appearance-none cursor-pointer border-gray-700 flex items-center justify-center">
          <input {...rest} ref={ref} type="checkbox" className="hidden" />
          <AnimatePresence>
            {isChecked && (
              <motion.div
                className="h-5 w-5 min-w-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaCheck size="100%" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </label>
    );
  }
);
