'use client';

import React, { useState, useEffect } from 'react';

import { Providers } from '../providers';
import { Calendar } from '@/components/ui';
import { ToastContainer } from '../ToastContainer';
import { EventFormModal } from '../EventFormModal';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { useEventModalStore } from '@/stores/event-modal-store';
import { useUserStore } from '@/stores/user-store';
import { CalendarData, CalendarType, CalendarState, Direction } from '@/types';
import {
  createYearData,
  computeMonthState,
  computeWeekState,
  computeDayState
} from '@/utils/calendar';

export type EventsCalendarProps = {
  initialData: CalendarData;
  initialState: CalendarState;
};

export const EventsCalendar: React.FC<EventsCalendarProps> = (props) => {
  const { initialData, initialState } = props;
  const { calendarState, setState: setCalendarState } = useCalendarStateStore();
  const showModal = useEventModalStore((state) => state.showModal);
  const [calendarData, setCalendarData] = useState<CalendarData>(initialData);
  const [currentView, setCurrentView] = useState(CalendarType.MOTH);

  const setUserData = useUserStore((state) => state.setUserData);

  const handleNavigation = (direction: Direction) => {
    console.log('NAV', direction);
    let nextState = { ...calendarState };
    switch (currentView) {
      case CalendarType.MOTH:
        nextState = computeMonthState(direction, nextState, calendarData);
        break;
      case CalendarType.WEEK:
        nextState = computeWeekState(direction, nextState, calendarData);
        break;
      case CalendarType.DAY:
        nextState = computeDayState(direction, nextState, calendarData);
        break;
    }

    if (!calendarData.years[nextState.year]) {
      setCalendarData((prev) => ({
        ...prev,
        years: {
          ...prev.years,
          [nextState.year]: createYearData(nextState.year)
        }
      }));
    }

    setCalendarState(nextState);
  };

  const openEventModal = () => {
    console.log('OPEN_MODAL');
    showModal();
  };

  const handleChangeView = (type: CalendarType) => {
    setCurrentView(type);
  };

  const openEventOnModal = (eventId: string) => {
    showModal(eventId);
  };

  useEffect(() => {
    setUserData('d7ceb2c2-e413-4353-bae4-c8553db1614c', 'test@example.com');
    setCalendarState(initialState);
  }, []);

  return (
    <Providers>
      <>
        <section className="px-24 py-20">
          <Calendar
            data={calendarData}
            type={currentView}
            onNav={handleNavigation}
            onCreateEvent={openEventModal}
            onChangeView={handleChangeView}
            onClickEvent={openEventOnModal}
          />
        </section>
        <ToastContainer />
        <EventFormModal />
      </>
    </Providers>
  );
};
