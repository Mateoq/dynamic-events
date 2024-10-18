import {
  Time,
  Day,
  Month,
  Week,
  Year,
  CalendarData,
  CalendarState,
  Direction
} from '@/types';
import {
  MAX_CALENDAR_MONTH_INDEX,
  MAX_CALENDAR_MONTH,
  MAX_CALENDAR_WEEKS,
  MAX_CALENDAR_WEEK_DAYS,
  MIN_DAY_HOUR,
  MAX_DAY_HOUR,
  HOUR_MINUTES_STEP,
  MINUTE_SECTIONS,
  WEEKDAYS
} from '@/constants';

export function checkIsToday(date: Date) {
  const todayDate = new Date();
  return (
    todayDate.getFullYear() === date.getFullYear() &&
    todayDate.getMonth() === date.getMonth() &&
    todayDate.getDate() === date.getDate()
  );
}

export function getYearKey(year: number): string {
  return `${year}`;
}

export function getMonthKey(year: number, month: number): string {
  return `${year}-${month}`;
}

export function getWeekKey(year: number, month: number, week: number): string {
  return `${year}-${month}-${week}`;
}

export function getDayKey(
  year: number,
  month: number,
  week: number,
  day: number
): string {
  return `${year}-${month}-${week}-${day}`;
}

export function getFirstMonthDate(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getLastMonthDate(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getLastMonthWeekDate(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDay();
}

export function createTimeData(hour: number): Time {
  const key = `${hour}`;
  const minutes: string[] = [...Array(MINUTE_SECTIONS)].map(
    (_, index) => `${hour}:${index * HOUR_MINUTES_STEP}`
  );

  return {
    key,
    hour,
    minutes
  };
}

export function createDayData(
  year: number,
  month: number,
  week: number,
  day: number
): Day {
  const key = getDayKey(year, month, week, day);
  const date = new Date(year, month, day);
  const isToday = checkIsToday(date);
  const times: Record<string, Time> = {};

  for (let hour = MIN_DAY_HOUR; hour < MAX_DAY_HOUR; hour++) {
    times[`${hour}`] = createTimeData(hour);
  }

  return {
    key,
    value: day,
    isToday,
    times
  };
}

export function createWeekData(
  year: number,
  month: number,
  week: number
): Week {
  const key = getWeekKey(year, month, week);
  const monthFirstIndex = getFirstMonthDate(year, month);
  const firstIndex = week === 0 ? monthFirstIndex : 0;
  const lastIndex =
    week === MAX_CALENDAR_WEEKS - 1
      ? getLastMonthWeekDate(year, month)
      : MAX_CALENDAR_WEEK_DAYS - 1;
  const days: Record<string, Day> = {};
  const daysOffset = firstIndex;

  for (let dayI = 0; dayI < MAX_CALENDAR_WEEK_DAYS; dayI++) {
    let day = 0;
    if (week === 0) {
      if (dayI > MAX_CALENDAR_WEEK_DAYS - firstIndex - 1) break;
      day = dayI + 1;
    } else {
      if (week === MAX_CALENDAR_WEEKS - 1 && dayI > lastIndex) break;
      day = week * MAX_CALENDAR_WEEK_DAYS - (monthFirstIndex - 1) + dayI;
    }

    days[getDayKey(year, month, week, day)] = createDayData(
      year,
      month,
      week,
      day
    );
  }

  return {
    key,
    value: week,
    firstIndex,
    lastIndex,
    days
  };
}

export function createMonthData(year: number, month: number): Month {
  const firstIndex = getFirstMonthDate(year, month);
  const lastIndex = getLastMonthDate(year, month);
  const key = getMonthKey(year, month);
  const weeks: Record<string, Week> = {};

  for (let week = 0; week < MAX_CALENDAR_WEEKS; week++) {
    weeks[getWeekKey(year, month, week)] = createWeekData(year, month, week);
  }

  return {
    key,
    value: month,
    firstIndex,
    lastIndex,
    weeks
  };
}

export function createYearData(year: number): Year {
  const key = getYearKey(year);
  const months: Record<string, Month> = {};

  for (let month = 0; month < MAX_CALENDAR_MONTH; month++) {
    months[getMonthKey(year, month)] = createMonthData(year, month);
  }

  return {
    key,
    value: year,
    months
  };
}

export function initCalendarData(initialDate = new Date()): CalendarData {
  const initialYear = initialDate.getFullYear();
  const yearData = createYearData(initialYear);
  const yearMap: Record<string, Year> = {
    [getYearKey(initialYear)]: yearData
  };

  return {
    years: yearMap
  };

  // const key = `${initialDate.getFullYear()}-${initialDate.getMonth()}`;
  // const monthData = mapMonthData(initialDate);
  // const calendarData = {
  //   [key]: monthData
  // };
  // return {
  //   currentKey: key,
  //   months: calendarData,
  //   currentDate: {
  //     year: initialDate.getFullYear(),
  //     month: initialDate.getMonth()
  //   }
  // };
}

export function mapMonthDays(data: Month): Array<null | Day> {
  const days: Day[] = [];
  const result: Array<null | Day> = [];

  for (const week of Object.values(data.weeks)) {
    days.push(...Object.values(week.days));
  }

  let dayIndex = 0;
  for (let i = 0; i < MAX_CALENDAR_MONTH_INDEX; i++) {
    if (i < data.firstIndex || i > days.length - 1) {
      result.push(null);
      continue;
    }

    result.push(days[dayIndex]);
    dayIndex++;
  }

  return result;
}

export function mapWeekDays(data: Week): Array<null | Day> {
  const days = Object.values(data.days);
  const result: Array<null | Day> = [];

  let dayIndex = 0;
  for (let i = 0; i < MAX_CALENDAR_WEEK_DAYS; i++) {
    if (i < data.firstIndex || dayIndex > days.length - 1) {
      result.push(null);
      continue;
    }

    result.push(days[dayIndex]);
    dayIndex++;
  }

  return result;
}

export function findDayWeek(calendarData: CalendarData, date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekResult = Object.values(
    calendarData.years[getYearKey(year)].months[getMonthKey(year, month)].weeks
  ).find((week) => Object.values(week.days).some((d: Day) => d.value === day))!;

  return weekResult.value;
}

export function getWeekDay(year: number, month: number, day: number): string {
  const date = new Date(year, month, day);
  const weekDay = WEEKDAYS[date.getDay()];

  return weekDay;
}

export function getMonthFromState(data: CalendarData, state: CalendarState) {
  const { year, month } = state;
  return data.years[getYearKey(year)].months[getMonthKey(year, month)];
}

export function getWeekFromState(
  data: CalendarData,
  state: CalendarState
): Week {
  const { year, month, week } = state;
  return data.years[getYearKey(year)].months[getMonthKey(year, month)].weeks[
    getWeekKey(year, month, week)
  ];
}

export function getDayFromState(data: CalendarData, state: CalendarState): Day {
  const { year, month, week, day } = state;
  return data.years[getYearKey(year)].months[getMonthKey(year, month)].weeks[
    getWeekKey(year, month, week)
  ].days[getDayKey(year, month, week, day)];
}

export function computeMonthState(
  direction: Direction,
  state: CalendarState,
  data: CalendarData
) {
  const newState = { ...state };
  newState.month =
    direction === Direction.LEFT ? newState.month - 1 : newState.month + 1;

  if (newState.month >= MAX_CALENDAR_MONTH) {
    newState.year += 1;
    newState.month = 0;
    newState.week = 0;
    newState.day = 1;
  } else if (newState.month < 0) {
    newState.year -= 1;
    newState.month = MAX_CALENDAR_MONTH - 1;
    newState.week = MAX_CALENDAR_WEEKS - 1;
    newState.day = Object.values(
      getWeekFromState(data, newState).days
    )[0].value;
  }

  return newState;
}

export function propagateStateChangeWeek(
  state: CalendarState,
  data: CalendarData
) {
  const newState = { ...state };
  if (newState.week >= MAX_CALENDAR_WEEKS) {
    newState.week = 0;
    newState.day = 1;

    if (newState.month + 1 >= MAX_CALENDAR_MONTH) {
      newState.month = 0;
      newState.year += 1;
    } else {
      newState.month += 1;
    }
  } else if (newState.week < 0) {
    newState.week = MAX_CALENDAR_WEEKS - 1;

    if (newState.month === 0) {
      newState.month = MAX_CALENDAR_MONTH - 1;
      newState.year -= 1;
    } else {
      newState.month -= 1;
    }

    const weekDays = Object.values(getWeekFromState(data, newState).days);
    newState.day = weekDays[weekDays.length - 1].value;
  }

  return newState;
}

export function computeWeekState(
  direction: Direction,
  state: CalendarState,
  data: CalendarData
) {
  let newState = { ...state };
  newState.week =
    direction === Direction.LEFT ? newState.week - 1 : newState.week + 1;

  newState = propagateStateChangeWeek(newState, data);

  if (newState.day !== 1) {
    const weekDays = Object.values(getWeekFromState(data, newState).days);
    newState.day = weekDays[weekDays.length - 1].value;
  }

  return newState;
}

export function computeDayState(
  direction: Direction,
  state: CalendarState,
  data: CalendarData
) {
  let newState = { ...state };
  const currentMonth = getMonthFromState(data, newState);
  newState.day =
    direction === Direction.LEFT ? newState.day - 1 : newState.day + 1;

  if (newState.day > currentMonth.lastIndex) {
    newState.day = 1;
    newState.week = 0;

    if (newState.month + 1 >= MAX_CALENDAR_MONTH) {
      newState.month = 0;
      newState.year += 1;
    } else {
      newState.month += 1;
    }
  } else if (newState.day < 1) {
    if (newState.month === 0) {
      newState.month = MAX_CALENDAR_MONTH - 1;
      newState.year -= 1;
    } else {
      newState.month -= 1;
    }
    const newMonth = getMonthFromState(data, state);
    newState.week = MAX_CALENDAR_WEEKS - 1;
    newState.day = newMonth.lastIndex;
  }

  const weekDays = Object.values(getWeekFromState(data, newState).days);
  if (newState.day < weekDays[0].value) {
    newState.week -= 1;
    newState = propagateStateChangeWeek(newState, data);
  } else if (newState.day > weekDays[weekDays.length - 1].value) {
    newState.week += 1;
    newState = propagateStateChangeWeek(newState, data);
  }

  return newState;
}
