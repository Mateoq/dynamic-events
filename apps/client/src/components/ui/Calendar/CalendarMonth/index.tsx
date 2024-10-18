'use client';
import React from 'react';

import { EventCard } from '../../EventCard';
import { useUserStore } from '@/stores/user-store';
import { useEventData } from '@/hooks/useEventData';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { Month, Day } from '@/types';
import { mapMonthDays } from '@/utils/calendar';
import { WEEKDAYS } from '@/constants';

type MonthEventsProps = {
  day: Day;
  onClickEvent: (id: string) => void;
};

const MonthEvents: React.FC<MonthEventsProps> = (props) => {
  const { day, onClickEvent } = props;
  const email = useUserStore((state) => state.email);
  const { data: eventData } = useEventData(email);
  const { year, month } = useCalendarStateStore((state) => state.calendarState);
  console.log('EVENTS', eventData);

  if (
    eventData === null ||
    !eventData.calendarEvents[year] ||
    !eventData.calendarEvents[year][month] ||
    !eventData.calendarEvents[year][month][day.value]
  ) {
    return null;
  }

  const dayEvents = Object.values(
    eventData.calendarEvents[year][month][day.value]
  ).flat();

  return (
    <div className="flex flex-col w-full">
      {dayEvents.map((eventId) => {
        const event = eventData.events[eventId];
        return (
          <React.Fragment key={`month_event_${eventId}`}>
            <EventCard data={event} onClick={onClickEvent} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export type CalendarMonthProps = {
  data: Month;
  onClickEvent: (id: string) => void;
};

export const CalendarMonth: React.FC<CalendarMonthProps> = (props) => {
  const { data, onClickEvent } = props;
  const days = mapMonthDays(data);

  return (
    <div className="grid grid-cols-7 grid-rows-calendar bg-gray-400 gap-1">
      {WEEKDAYS.map((day, index) => (
        <div
          key={`day_name_${day}_${index}`}
          className="bg-gray-400 flex items-center justify-center"
        >
          <span className="text-gray-900 text-xl text-center">{day}</span>
        </div>
      ))}
      {days.map((day, index) => {
        if (day === null) {
          return (
            <div
              key={`empty_slot_${index}`}
              className="h-full bg-gray-300"
            ></div>
          );
        }

        return (
          <div
            key={`date_slot_${day.key}`}
            className="min-h-32 bg-gray-100 p-3"
          >
            <span className="text-lg">
              {day.value.toString().padStart(2, '0')}
            </span>
            <MonthEvents day={day} onClickEvent={onClickEvent} />
          </div>
        );
      })}
    </div>
  );
};
