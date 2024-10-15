import uniqolor from 'uniqolor';

import {
  EventData,
  CreateEventDto,
  CreateEventApiDto,
  UpdateEventDto,
  TransactionResult,
  TransactionResultType
} from '@/types';
import { createEvent, updateEvent, getEvents } from '@/endpoints';
import { mapEvents, mapCalendarEvents } from '@/utils/events';
import { newTransactionResult } from '@/helpers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email')!;

  try {
    const eventsResult = await getEvents(email);

    if (eventsResult) {
      const eventMap = mapEvents(eventsResult);
      const calendarEvents = mapCalendarEvents(eventsResult);
      const data: EventData = { events: eventMap, calendarEvents };

      return Response.json(
        newTransactionResult(data, TransactionResultType.SUCCESS, true),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    return Response.json(
      newTransactionResult(null, TransactionResultType.SUCCESS, true),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (e) {
    return Response.json(
      newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  Response.json(
    newTransactionResult(null, TransactionResultType.UNKNOWN_ERROR, false),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export async function POST(request: Request) {
  const body: CreateEventDto = await request.json();
  const eventDto: CreateEventApiDto = {
    ...body,
    color: uniqolor.random().color
  };

  try {
    const event = await createEvent(eventDto);

    if (event) {
      return Response.json(
        newTransactionResult(null, TransactionResultType.SUCCESS, true),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (e) {
    return Response.json(
      newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  Response.json(
    newTransactionResult(null, TransactionResultType.UNKNOWN_ERROR, false),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export async function PATCH(request: Request) {
  const body: UpdateEventDto = await request.json();
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('event')!;

  console.log('PARAMGS', eventId, body);

  try {
    const event = await updateEvent(eventId, body);

    console.log('RESULT', event);

    if (event) {
      return Response.json(
        newTransactionResult(null, TransactionResultType.SUCCESS, true),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
  } catch (e) {
    return Response.json(
      newTransactionResult(null, TransactionResultType.ERROR, false, {
        message: (e as Error).message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  Response.json(
    newTransactionResult(null, TransactionResultType.UNKNOWN_ERROR, false),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}
