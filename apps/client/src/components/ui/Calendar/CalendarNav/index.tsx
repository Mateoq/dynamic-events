import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { Button, SelectInput, SelectItem } from '@/components/form';
import { useCalendarStateStore } from '@/stores/calendar-state-store';
import { Direction, CalendarType, CalendarState } from '@/types';
import { MONTH_NAMES } from '@/constants';

const viewOptions: SelectItem[] = [
  { label: 'Month', value: CalendarType.MOTH },
  { label: 'Week', value: CalendarType.WEEK },
  { label: 'Day', value: CalendarType.DAY }
];

export type CalendarNavProps = {
  currentView: CalendarType;
  onChangeView: (type: CalendarType) => void;
  onNav: (direction: Direction) => void;
  onCreateEvent: () => void;
};

export const CalendarNav: React.FC<CalendarNavProps> = (props) => {
  const { currentView, onNav, onCreateEvent, onChangeView } = props;
  const calendarState = useCalendarStateStore((state) => state.calendarState);

  return (
    <div className="w-full flex justify-between bg-gray-100 px-2 py-3">
      <div className="flex gap-x-2">
        <button
          aria-label="Previous"
          className="transition-opacity hover:opacity-70 active:opacity-100"
          onClick={() => onNav(Direction.LEFT)}
        >
          <FaChevronLeft size="30px" />
        </button>
        <button
          aria-label="Next"
          className="transition-opacity hover:opacity-70 active:opacity-100"
          onClick={() => onNav(Direction.RIGHT)}
        >
          <FaChevronRight size="30px" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center text-center">
        <p className="text-xl font-semibold text-gray-900">
          {MONTH_NAMES[calendarState.month]} - {calendarState.year}
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <SelectInput
          options={viewOptions}
          value={currentView}
          onChange={(e) => onChangeView(e.target.value as CalendarType)}
        />
        <Button onClick={onCreateEvent}>New Event</Button>
      </div>
    </div>
  );
};
