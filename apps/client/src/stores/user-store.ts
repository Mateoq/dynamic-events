import { create } from 'zustand';

export type UserStore = {
  id: string | null;
  email: string | null;
  setUserData: (id: string, email: string) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  email: null,
  id: null,
  setUserData: (id, email) => {
    set({ id, email });
  },
  clearUserData: () => {
    set({ id: null, email: null });
  }
}));
