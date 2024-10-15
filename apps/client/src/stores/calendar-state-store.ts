import { create } from 'zustand';

import { CalendarState } from '@/types';

export type CalendarStateStore = {
  calendarState: CalendarState;
  setState: (newState: CalendarState) => void;
};

export const useCalendarStateStore = create<CalendarStateStore>((set) => ({
  calendarState: {
    year: 0,
    month: 0,
    week: 0,
    day: 0
  },
  setState: (newState) => {
    set(() => ({ calendarState: { ...newState } }));
  }
}));
