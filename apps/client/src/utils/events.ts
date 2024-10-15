import { EventMap, Event, UserEventMap } from '@/types';
import { getLastMonthDate } from './calendar';
import { MAX_CALENDAR_MONTH } from '@/constants';

export function mapEvents(events: Event[]): EventMap {
  const map: EventMap = {};

  for (const event of events) {
    map[event.id] = event;
  }

  return map;
}

export function mapCalendarEvents(events: Event[]): UserEventMap {
  const map: UserEventMap = {};

  for (const event of events) {
    const { startYear, startMonth, startDate, endYear, endMonth, endDate } =
      event;

    for (let year = startYear; year <= endYear; year++) {
      const firstMonth = year === startYear ? startMonth : 0;
      const lastMonth = year === endYear ? endMonth : MAX_CALENDAR_MONTH - 1;
      if (!map[year]) {
        map[year] = {};
      }

      console.log('YEAR', map);

      for (let month = firstMonth; month <= lastMonth; month++) {
        const firstDay =
          year === startYear && month === startMonth ? startDate : 1;
        const lastDay =
          year === endYear && month === endMonth
            ? endDate
            : getLastMonthDate(year, month);

        if (!map[year][month]) {
          map[year][month] = {};
        }

        console.log('MONTH', map, firstDay, lastDay, event);

        for (let day = firstDay; day <= lastDay; day++) {
          if (!map[year][month][day]) {
            map[year][month][day] = {};
          }

          if (!map[year][month][day][event.time]) {
            map[year][month][day][event.time] = [];
          }

          console.log('TIME', map);

          map[year][month][day][event.time].push(event.id);
        }
      }
    }
  }

  return map;
}
