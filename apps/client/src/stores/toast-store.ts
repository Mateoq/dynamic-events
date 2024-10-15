import { create } from 'zustand';

import { ToastType } from '@/types';

export type ToastStore = {
  isOpen: boolean;
  text: string;
  type: ToastType;
  showToast: (text: string, type: ToastType) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  text: '',
  type: ToastType.SUCCESS,
  showToast: (text, type) => {
    set((state) => ({ isOpen: true, text, type }));
  },
  hideToast: () => {
    set((state) => ({ isOpen: false, text: '' }));
  }
}));
