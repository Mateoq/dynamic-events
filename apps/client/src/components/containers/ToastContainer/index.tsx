'use client';

import React, { useEffect } from 'react';

import { Toast } from '@/components/ui';
import { useToastStore } from '@/stores/toast-store';
import { sleep } from '@/utils/functions';
import { TOAST_SLEEP_TIME } from '@/constants';

export const ToastContainer: React.FC = () => {
  const { isOpen, text, type, hideToast } = useToastStore();

  const sleepNHide = async () => {
    await sleep(TOAST_SLEEP_TIME);
    hideToast();
  };

  useEffect(() => {
    if (isOpen) {
      sleepNHide();
    }
  }, [isOpen]);

  return <Toast isOpen={isOpen} text={text} type={type} />;
};
