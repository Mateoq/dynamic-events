import React from 'react';

import { EventCard } from '../../EventCard';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { useUserStore } from '@/stores/user-store';
import { useEventData } from '@/hooks/useEventData';
import { Week, Day } from '@/types';
import { mapWeekDays } from '@/utils/calendar';
import { WEEKDAYS } from '@/constants';

type WeekEventsProps = {
  day: Day;
  hour: number;
  onClickEvent: (id: string) => void;
};

const WeekEvents: React.FC<WeekEventsProps> = (props) => {
  const { day, hour, onClickEvent } = props;
  const email = useUserStore((state) => state.email);
  const { data: eventData } = useEventData(email);
  const { year, month } = useCalendarStateStore((state) => state.calendarState);

  if (
    eventData === null ||
    !eventData.calendarEvents[year] ||
    !eventData.calendarEvents[year][month] ||
    !eventData.calendarEvents[year][month][day.value] ||
    !eventData.calendarEvents[year][month][day.value][hour]
  ) {
    return null;
  }

  const hourEvents = eventData.calendarEvents[year][month][day.value][hour];

  return (
    <div className="flex h-full">
      {hourEvents.map((eventId) => {
        const event = eventData.events[eventId];
        return (
          <React.Fragment key={`week_event_${eventId}`}>
            <EventCard data={event} onClick={onClickEvent} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export type CalendarWeekProps = {
  data: Week;
  onClickEvent: (id: string) => void;
};

export const CalendarWeek: React.FC<CalendarWeekProps> = (props) => {
  const { data, onClickEvent } = props;
  const days = mapWeekDays(data);

  return (
    <div className="w-full flex gap-x-1">
      {WEEKDAYS.map((day, index) => (
        <div key={`week_day_${day}`} className="flex-1 flex flex-col">
          <div className=" bg-gray-400 flex items-center justify-center h-16">
            <p className="text-gray-900 text-xl text-center">{day}</p>
            {days[index] && (
              <p className="w-7 h-7 bg-gray-800 rounded-full text-md text-white ml-2 flex justify-center items-center font-bold">
                {days[index]?.value}
              </p>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-y-1">
            {days[index] === null ? (
              <div className="flex-1 bg-gray-300"></div>
            ) : (
              <>
                {Object.values(days[index].times).map((time) => (
                  <div
                    key={`day_time_${day}_${time.hour}`}
                    className="h-16 w-full relative bg-gray-200 px-2 pb-2 pt-4"
                  >
                    <span className="text-xs text-gray-600 absolute left-px top-px">
                      {time.hour}:00
                    </span>
                    <WeekEvents
                      day={days[index]!}
                      hour={time.hour}
                      onClickEvent={onClickEvent}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
