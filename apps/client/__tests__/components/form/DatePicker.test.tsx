import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DatePicker } from '@/components/form';

describe('DatePicker', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <DatePicker
        label="Date Picker"
        message="Error"
        value={{
          startDate: new Date(2024, 9, 17),
          endDate: new Date(2024, 9, 17)
        }}
        onChange={() => {}}
      />
    );
    const label = await screen.findByText('Date Picker');

    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
