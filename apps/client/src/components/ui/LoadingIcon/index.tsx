import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa6';

export type LoadingIconProps = {
  color?: string;
};

export const LoadingIcon: React.FC<LoadingIconProps> = (props) => {
  const { color = 'white' } = props;
  return (
    <motion.div
      className="w-4 h-4 round-full"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
    >
      <FaSpinner color={color} />
    </motion.div>
  );
};
