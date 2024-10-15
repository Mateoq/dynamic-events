import React from 'react';

import { Event } from '@/types';

export type EventCardProps = {
  data: Event;
  onClick?: (id: string) => void;
};

export const EventCard: React.FC<EventCardProps> = (props) => {
  const { data, onClick } = props;
  return (
    <button
      className="flex-1 px-1 overflow-hidden"
      style={{ background: data.color }}
      onClick={() => onClick?.(data.id)}
    >
      <p className="text-white text-sm truncate">{data.title}</p>
    </button>
  );
};
