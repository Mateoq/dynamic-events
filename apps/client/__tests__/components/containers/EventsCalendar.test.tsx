import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EventsCalendar } from '@/components/containers';
import { CalendarType } from '@/types';
import {
  createInitialCalendarState,
  initialCalendarData,
  getEvents,
  emptySuccessTransactionResult
} from '../../../test-mocks';
import { sleep } from '@/utils/functions';

const state = createInitialCalendarState();

jest.mock('@/hooks/useEventData', () => ({
  useEventData: () => ({
    data: getEvents(),
    isLoading: false,
    refetchData: jest.fn()
  })
}));

const mockedFn = jest.fn();
jest.mock('@/hooks/useMutateEvent', () => ({
  useMutateEvent: () => ({
    mutate: () =>
      new Promise((resolve) => {
        mockedFn();
        resolve(emptySuccessTransactionResult);
      }),
    isLoading: false
  })
}));

describe('EventsCalendar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    const { container } = render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const title = await screen.findByText('October - 2024');

    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render month view by default', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const currentStateDay = await screen.findByText('17');

    expect(currentStateDay).toBeInTheDocument();
  });

  it('should change to week view', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const viewSelect = await screen.findByRole('listbox');
    await userEvent.selectOptions(viewSelect, CalendarType.WEEK);

    const time = await screen.findAllByText('1:00');

    expect(time[0]).toBeInTheDocument();
  });

  it('should change to day view', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const viewSelect = await screen.findByRole('listbox');
    await userEvent.selectOptions(viewSelect, CalendarType.DAY);

    const time = await screen.findAllByText('1:00');

    expect(time[0]).toBeInTheDocument();
    expect(time).toHaveLength(1);
  });

  it('should open event form modal', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );

    const newEventBtn = await screen.findByText('New Event');

    await userEvent.click(newEventBtn);

    const titleLabel = await screen.findByText('Title');

    expect(titleLabel).toBeInTheDocument();
  });

  it('should close event form modal', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );

    const newEventBtn = await screen.findByText('New Event');

    await userEvent.click(newEventBtn);

    const closeBtn = await screen.findByLabelText('Close Modal');

    await userEvent.click(closeBtn);

    // Wait until modal fades out
    await sleep(1000);

    const titleInput = screen.queryByLabelText('Title');

    expect(titleInput).not.toBeInTheDocument();
  });

  it('should go to previous month', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const prevBtn = await screen.findByLabelText('Previous');

    await userEvent.click(prevBtn);

    const monthTitle = await screen.findByText('September - 2024');

    expect(monthTitle).toBeInTheDocument();
  });

  it('should go to next month', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const nextBtn = await screen.findByLabelText('Next');

    await userEvent.click(nextBtn);

    const monthTitle = await screen.findByText('November - 2024');

    expect(monthTitle).toBeInTheDocument();
  });

  it('should open event form modal when clicking event card', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );
    const eventCards = await screen.findAllByText('ANother');

    await userEvent.click(eventCards[0]);

    const titleInput = await screen.findByLabelText('Title');

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveValue('ANother');
  });

  it('should submit to create an event', async () => {
    render(
      <EventsCalendar initialData={initialCalendarData} initialState={state} />
    );

    const newEventBtn = await screen.findByText('New Event');

    await userEvent.click(newEventBtn);

    const titleInput = await screen.findByLabelText('Title');
    const descriptionInput = await screen.findByLabelText('Description');
    const cityInput = await screen.findByLabelText('City');
    const startDateInput = await screen.findByLabelText('Start Date');
    const endDateInput = await screen.findByLabelText('End Date');
    const timeInput = await screen.findByLabelText('Time');

    await userEvent.type(titleInput, 'title');
    await userEvent.type(descriptionInput, 'description');
    await userEvent.selectOptions(cityInput, 'New York');

    // Change start date DatePicker value
    await userEvent.click(startDateInput);
    const startOptions = await screen.findAllByRole('option');
    await userEvent.click(startOptions[1]);
    await userEvent.click(titleInput);

    // Change end date DatePicker value
    await userEvent.click(endDateInput);
    const endOptions = await screen.findAllByRole('option');
    await userEvent.click(endOptions[2]);
    await userEvent.click(titleInput);

    await userEvent.selectOptions(timeInput, '12');

    const submitBtn = await screen.findByRole('button', { name: 'Save' });

    fireEvent.submit(submitBtn);

    await waitFor(() => {
      expect(mockedFn).toHaveBeenCalled();
      expect(titleInput).not.toBeInTheDocument();
    });
  });
});
