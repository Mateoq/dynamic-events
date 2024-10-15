export enum Direction {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum CalendarType {
  MOTH = 'MONTH',
  WEEK = 'WEEK',
  DAY = 'DAY'
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export type Time = {
  key: string;
  hour: number;
  minutes: string[];
};

export type Day = {
  key: string;
  value: number;
  isToday: boolean;
  times: Record<string, Time>;
};

export type Week = {
  key: string;
  value: number;
  firstIndex: number;
  lastIndex: number;
  days: Record<string, Day>;
};

export type Month = {
  key: string;
  value: number;
  firstIndex: number;
  lastIndex: number;
  weeks: Record<string, Week>;
};

export type Year = {
  key: string;
  value: number;
  months: Record<string, Month>;
};

export type CalendarData = {
  years: Record<string, Year>;
};

export type DayToRender = {
  data: Day;
  week: number;
};

export type CalendarState = {
  year: number;
  month: number;
  week: number;
  day: number;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  city: string;
  startYear: number;
  startMonth: number;
  startDate: number;
  endYear: number;
  endMonth: number;
  endDate: number;
  time: number;
  fullDay: boolean;
  color: string;
};

export type CreateEventDto = {
  title: string;
  description: string;
  city: string;
  startYear: number;
  startMonth: number;
  startDate: number;
  endYear: number;
  endMonth: number;
  endDate: number;
  time: number;
  fullDay: boolean;
  userId: string;
};

export type UpdateEventDto = Partial<CreateEventDto>;

export type CreateEventApiDto = CreateEventDto & {
  color: string;
};

export enum TransactionResultType {
  SUCCESS = 'TRAN_SUCCESS',
  EMAIL_USED = 'TRAN_EMAIL_USED',
  WRONG_ID = 'TRAN_WRONG_ID',
  WRONG_USER = 'TRAN_WRONG_USER',
  ERROR = 'TRAN_ERROR',
  UNKNOWN_ERROR = 'TRAN_UNKNOWN_ERROR'
}

export interface TransactionError {
  message: string;
}

export type TransactionResult<T> = {
  status: boolean;
  type: TransactionResultType;
  data: T;
  error: TransactionError | null;
};

export type EventMap = Record<string, Event>;

export type TimeEventMap = Record<number, string[]>;

export type DayEventMap = Record<number, TimeEventMap>;

export type MonthEventMap = Record<number, DayEventMap>;

export type YearEventMap = Record<number, MonthEventMap>;

export type UserEventMap = YearEventMap;

export type EventData = {
  events: EventMap;
  calendarEvents: UserEventMap;
};
// --------------------------------

export type DateItem = {
  key: string;
  date: Date;
  isToday: boolean;
};

export type DateMap = {
  [key: string]: DateItem;
};

export type MonthData = {
  firstIndex: number;
  lastIndex: number;
  dates: DateMap;
};

export type MonthMap = {
  [key: string]: MonthData;
};

export type CalendarMonthData = {
  currentKey: string;
  months: MonthMap;
  currentDate: {
    year: number;
    month: number;
  };
};
