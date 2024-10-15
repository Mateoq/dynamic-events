import Image from 'next/image';

import { EventsCalendar } from '@/components/containers';
import { CalendarState } from '@/types';
import { initCalendarData, findDayWeek } from '@/utils/calendar';

export default function Home() {
  const calendarData = initCalendarData();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const week = findDayWeek(calendarData, date);
  const day = date.getDate();
  const initialState: CalendarState = {
    year,
    month,
    week,
    day
  };
  console.log('SERVER?', calendarData);

  return (
    <main>
      <EventsCalendar initialData={calendarData} initialState={initialState} />
    </main>
  );
}
