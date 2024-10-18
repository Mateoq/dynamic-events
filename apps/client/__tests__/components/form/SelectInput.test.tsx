import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SelectInput, SelectItem } from '@/components/form';

const options: SelectItem[] = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' }
];

describe('SelectInput', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <SelectInput
        label="SelectInput Label"
        name="select"
        id="select"
        options={options}
        message="Error"
      />
    );
    const label = await screen.findByText('SelectInput Label');

    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
