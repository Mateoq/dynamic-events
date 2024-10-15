import React from 'react';

import { CalendarMonth } from './CalendarMonth';
import { CalendarWeek } from './CalendarWeek';
import { CalendarDay } from './CalendarDay';
import { CalendarNav } from './CalendarNav';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { CalendarData, Direction, CalendarType } from '@/types';
import {
  getYearKey,
  getMonthKey,
  getWeekKey,
  getDayKey,
  getMonthFromState,
  getWeekFromState,
  getDayFromState
} from '@/utils/calendar';

export type CalendarProps = {
  type: CalendarType;
  data: CalendarData;
  onNav: (direction: Direction) => void;
  onCreateEvent: () => void;
  onChangeView: (type: CalendarType) => void;
  onClickEvent: (id: string) => void;
};

export const Calendar: React.FC<CalendarProps> = (props) => {
  const { type, data, onNav, onCreateEvent, onChangeView, onClickEvent } =
    props;
  const state = useCalendarStateStore((state) => state.calendarState);
  let currentComponent = (
    <div className="text-red-600 text-xl">Unknown Calendar</div>
  );

  console.log('DATA', data);

  if (state.year === 0 || state.month === 0 || state.day === 0) {
    return null;
  }

  switch (type) {
    case CalendarType.MOTH:
      const monthData = getMonthFromState(data, state);
      currentComponent = (
        <CalendarMonth data={monthData} onClickEvent={onClickEvent} />
      );
      break;
    case CalendarType.WEEK:
      const weekData = getWeekFromState(data, state);
      currentComponent = (
        <CalendarWeek data={weekData} onClickEvent={onClickEvent} />
      );
      break;
    case CalendarType.DAY:
      const dayData = getDayFromState(data, state);
      currentComponent = (
        <CalendarDay data={dayData} onClickEvent={onClickEvent} />
      );
      break;
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <CalendarNav
          currentView={type}
          onNav={onNav}
          onCreateEvent={onCreateEvent}
          onChangeView={onChangeView}
        />
        {currentComponent}
      </div>
    </div>
  );
};
