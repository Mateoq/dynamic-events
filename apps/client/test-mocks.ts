import { CalendarState, Event, TransactionResultType } from '@/types';
import { findDayWeek, initCalendarData } from '@/utils/calendar';
import { newTransactionResult } from '@/helpers';

export const emptySuccessTransactionResult = newTransactionResult(
  null,
  TransactionResultType.SUCCESS,
  true
);

export const singleEvent: Event = {
  id: 'test-id',
  title: 'Test Event',
  description: 'Test description',
  city: 'New York',
  startYear: 2024,
  startMonth: 9,
  startDate: 17,
  endYear: 2024,
  endMonth: 9,
  endDate: 20,
  time: 13,
  fullDay: false,
  color: '#FF00FF'
};

export const initialCalendarData = initCalendarData(new Date(2024, 9, 17));

export function createInitialCalendarState() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const week = findDayWeek(initialCalendarData, date);
  const day = date.getDate();
  const initialState: CalendarState = {
    year,
    month,
    week,
    day
  };

  return initialState;
}

const events = {
  events: {
    'caeeb5f1-6788-4b1f-bbf9-ee27b19dc84f': {
      id: 'caeeb5f1-6788-4b1f-bbf9-ee27b19dc84f',
      title: 'Test',
      description: 'asfasf',
      city: 'New York',
      startYear: 2024,
      startMonth: 9,
      startDate: 14,
      endYear: 2024,
      endMonth: 9,
      endDate: 16,
      time: 14,
      fullDay: false,
      color: '#c6cd65'
    },
    '9ca87c5d-ac5d-4cca-9510-fefffbb3a801': {
      id: '9ca87c5d-ac5d-4cca-9510-fefffbb3a801',
      title: 'ANother',
      description: 'gasasf',
      city: 'New York',
      startYear: 2024,
      startMonth: 9,
      startDate: 14,
      endYear: 2024,
      endMonth: 9,
      endDate: 25,
      time: 17,
      fullDay: false,
      color: '#4c94c8'
    },
    'df42f359-04ee-4b46-acac-aa55b2b76fa8': {
      id: 'df42f359-04ee-4b46-acac-aa55b2b76fa8',
      title: 'Test 2',
      description: 'asfasf',
      city: 'New York',
      startYear: 2024,
      startMonth: 9,
      startDate: 14,
      endYear: 2024,
      endMonth: 9,
      endDate: 14,
      time: 14,
      fullDay: false,
      color: '#543bc4'
    }
  },
  calendarEvents: {
    '2024': {
      '9': {
        '14': {
          '14': [
            'caeeb5f1-6788-4b1f-bbf9-ee27b19dc84f',
            'df42f359-04ee-4b46-acac-aa55b2b76fa8'
          ],
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '15': {
          '14': ['caeeb5f1-6788-4b1f-bbf9-ee27b19dc84f'],
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '16': {
          '14': ['caeeb5f1-6788-4b1f-bbf9-ee27b19dc84f'],
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '17': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '18': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '19': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '20': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '21': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '22': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '23': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '24': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        },
        '25': {
          '17': ['9ca87c5d-ac5d-4cca-9510-fefffbb3a801']
        }
      }
    }
  }
};

export function getEvents() {
  return events;
}
