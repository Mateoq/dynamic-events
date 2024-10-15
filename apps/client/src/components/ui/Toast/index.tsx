import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import { ToastType } from '@/types';

export type ToastProps = {
  isOpen?: boolean;
  type: ToastType;
  text: string;
};

export const Toast: React.FC<ToastProps> = (props) => {
  const { isOpen, type, text } = props;
  const isSuccess = type === ToastType.SUCCESS;
  const isError = type === ToastType.ERROR;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            'w-52 min-h-24 rounded filter drop-shadow-lg flex items-center justify-center p-5 z-[100] fixed bottom-5 right-5',
            { 'bg-gray-900': isSuccess, 'bg-red-600': isError }
          )}
        >
          <span className="text-md text-gray-100">{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
