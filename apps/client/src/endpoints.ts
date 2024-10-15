import {
  CreateEventDto,
  CreateEventApiDto,
  UpdateEventDto,
  Event,
  TransactionResult,
  EventData
} from './types';
import { API_URLS } from './constants';
import { API_HOST, API_PORT } from './config';

function formatApiUrl(path: string): string {
  return `${API_HOST}:${API_PORT}${path}`;
}

export async function createEvent(
  data: CreateEventApiDto
): Promise<TransactionResult<Event>> {
  return fetch(formatApiUrl(API_URLS.EVENTS), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then<TransactionResult<Event>>((res) => res.json());
}

export async function updateEvent(
  id: string,
  data: UpdateEventDto
): Promise<TransactionResult<Event>> {
  return fetch(formatApiUrl(API_URLS.EVENT(id)), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then<TransactionResult<Event>>((res) => res.json());
}

export async function getEvents(email: string): Promise<Event[] | null> {
  return fetch(formatApiUrl(API_URLS.USER_EVENTS(email)), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then<Event[] | null>((res) => res.json());
}

export async function createEventDb(
  data: CreateEventDto
): Promise<TransactionResult<null>> {
  return fetch(`/api${API_URLS.EVENTS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then<TransactionResult<null>>((res) => res.json());
}

export async function updateEventDb(
  id: string,
  data: UpdateEventDto
): Promise<TransactionResult<null>> {
  return fetch(`/api${API_URLS.EVENTS}?event=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then<TransactionResult<null>>((res) => res.json());
}

export async function getEventData(
  email: string
): Promise<TransactionResult<EventData>> {
  return fetch(`/api${API_URLS.USER_EVENTS(email)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then<TransactionResult<EventData>>((res) => res.json());
}
