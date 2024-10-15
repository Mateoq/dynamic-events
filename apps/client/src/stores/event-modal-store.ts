import { create } from 'zustand';

export type EventModalStore = {
  isOpen: boolean;
  eventId: string | null;
  showModal: (eventId?: string | null) => void;
  hideModal: () => void;
};

export const useEventModalStore = create<EventModalStore>((set) => ({
  isOpen: false,
  eventId: null,
  showModal: (eventId = null) => {
    set((state) => ({ isOpen: true, eventId }));
  },
  hideModal: () => {
    set((state) => ({ isOpen: false, eventId: null }));
  }
}));
