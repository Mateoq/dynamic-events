export const API_URLS = {
  EVENTS: '/events',
  EVENT: (id: string) => `/events/${id}`,
  USER_EVENTS: (email: string) => `/events?email=${email}`
};

export const QUERY_KEYS = {
  MUTATE_EVENT: 'mutate_order',
  GET_EVENT_DATA: 'get_event_data'
};

export const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'Charlotte',
  'San Francisco',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Washington',
  'Boston',
  'El Paso',
  'Nashville',
  'Detroit',
  'Oklahoma City',
  'Portland',
  'Las Vegas',
  'Memphis',
  'Louisville',
  'Baltimore',
  'Milwaukee',
  'Albuquerque',
  'Tucson',
  'Fresno',
  'Sacramento',
  'Kansas City',
  'Atlanta',
  'Miami',
  'Colorado Springs',
  'Raleigh',
  'Omaha',
  'Long Beach',
  'Virginia Beach',
  'Oakland',
  'Minneapolis',
  'Tulsa',
  'Tampa',
  'Arlington',
  'New Orleans',
  'Wichita',
  'Cleveland',
  'Bakersfield',
  'Aurora',
  'Anaheim',
  'Honolulu',
  'Santa Ana',
  'Riverside',
  'Corpus Christi',
  'Lexington',
  'Stockton',
  'Henderson',
  'Saint Paul',
  'St. Louis',
  'Cincinnati',
  'Pittsburgh',
  'Greensboro',
  'Anchorage',
  'Plano',
  'Lincoln',
  'Orlando',
  'Irvine',
  'Newark',
  'Durham',
  'Chula Vista',
  'Toledo',
  'Fort Wayne',
  'St. Petersburg',
  'Jersey City',
  'Chandler',
  'Laredo',
  'Madison',
  'Lubbock',
  'Scottsdale',
  'Reno',
  'Buffalo',
  'Gilbert',
  'Glendale',
  'North Las Vegas',
  'Winston-Salem',
  'Chesapeake',
  'Norfolk',
  'Fremont',
  'Garland',
  'Irving',
  'Hialeah',
  'Richmond',
  'Boise',
  'Spokane',
  'Baton Rouge',
  'Tacoma',
  'San Bernardino',
  'Modesto',
  'Fontana',
  'Des Moines',
  'Moreno Valley',
  'Santa Clarita',
  'Fayetteville',
  'Birmingham',
  'Oxnard',
  'Rochester',
  'Port St. Lucie',
  'Grand Rapids'
];

export const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export const MAX_CALENDAR_MONTH = 12;

export const MAX_CALENDAR_WEEKS = 5;

export const MAX_CALENDAR_WEEK_DAYS = 7;

export const MAX_CALENDAR_MONTH_INDEX = 35;

export const MIN_DAY_HOUR = 0;

export const MAX_DAY_HOUR = 24;

export const MINUTE_SECTIONS = 4;

export const HOUR_MINUTES_STEP = 15;

export const MAX_HOUR_MINUTES = 45;

export const TOAST_SLEEP_TIME = 4000;
