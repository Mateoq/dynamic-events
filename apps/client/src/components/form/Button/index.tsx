import React from 'react';

import { LoadingIcon } from '@/components/ui';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { isLoading, children, ...rest } = props;

  return (
    <button
      {...rest}
      className="min-w-24 h-10 px-3o flex items-center justify-center bg-gray-950 text-white text-lg hover:bg-gray-800 active:bg-gray-700 transition-colors"
    >
      {isLoading ? <LoadingIcon /> : children}
    </button>
  );
};
