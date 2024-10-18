import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { EventCard } from '@/components/ui';
import { singleEvent } from '../../../test-mocks';

describe('EventCard', () => {
  it('should match snapshot', async () => {
    const { container } = render(<EventCard data={singleEvent} />);
    const title = await screen.findByText(singleEvent.title);

    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
