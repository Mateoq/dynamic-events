import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';

export type ModalProps = {
  isOpen?: boolean;
  title: string;
  onClose: () => void;
};

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = (props) => {
  const { isOpen, title, children, onClose } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50 overflow-visible"
        >
          <div className="w-[500px] h-fit bg-white rounded shadow-2xl relative flex flex-col">
            <div className="flex justify-between h-fit py-2 px-2 bg-gray-500 rounded-t">
              <h3 className="text-lg text-gray-50 font-medium">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close Modal"
                className="h-6 w-6 transition-opacity hover:opacity-80 active:opacity-100"
              >
                <FaXmark size="100%" className="text-gray-50" />
              </button>
            </div>
            <div className="px-3 py-5">{children}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
