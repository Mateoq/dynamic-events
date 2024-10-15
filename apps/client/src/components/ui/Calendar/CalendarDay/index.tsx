import React from 'react';

import { EventCard } from '../../EventCard';
import { useUserStore } from '@/stores/user-store';
import { useEventData } from '@/hooks/useEventData';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { Day } from '@/types';
import { getWeekDay } from '@/utils/calendar';

type DayEventsProps = {
  hour: number;
  onClickEvent: (id: string) => void;
};

const DayEvents: React.FC<DayEventsProps> = (props) => {
  const { hour, onClickEvent } = props;
  const email = useUserStore((state) => state.email);
  const { data: eventData } = useEventData(email);
  const { year, month, day } = useCalendarStateStore(
    (state) => state.calendarState
  );

  if (
    eventData === null ||
    !eventData.calendarEvents[year] ||
    !eventData.calendarEvents[year][month] ||
    !eventData.calendarEvents[year][month][day] ||
    !eventData.calendarEvents[year][month][day][hour]
  ) {
    return null;
  }

  const hourEvents = eventData.calendarEvents[year][month][day][hour];

  return (
    <div className="flex h-full">
      {hourEvents.map((eventId) => {
        const event = eventData.events[eventId];
        return (
          <React.Fragment key={`day_event_${eventId}`}>
            <EventCard data={event} onClick={onClickEvent} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export type CalendarDayProps = {
  data: Day;
  onClickEvent: (id: string) => void;
};

export const CalendarDay: React.FC<CalendarDayProps> = (props) => {
  const { data, onClickEvent } = props;
  const calendarState = useCalendarStateStore((state) => state.calendarState);
  const weekday = getWeekDay(
    calendarState.year,
    calendarState.month,
    data.value
  );
  return (
    <div className="flex-1 flex flex-col">
      <div className=" bg-gray-400 flex items-center justify-center h-16">
        <p className="text-gray-900 text-xl text-center">{weekday}</p>
        <p className="w-7 h-7 bg-gray-800 rounded-full text-md text-white ml-2 flex justify-center items-center font-bold">
          {data.value}
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-y-1">
        {Object.values(data.times).map((time) => (
          <div
            key={`day_time_${data.value}_${time.hour}`}
            className="h-16 w-full relative bg-gray-200 px-2 pb-2 pt-4"
          >
            <span className="text-xs text-gray-600 absolute left-px top-px">
              {time.hour}:00
            </span>
            <DayEvents hour={time.hour} onClickEvent={onClickEvent} />
          </div>
        ))}
      </div>
    </div>
  );
};
