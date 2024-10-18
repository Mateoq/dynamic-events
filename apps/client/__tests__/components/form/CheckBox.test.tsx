import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CheckBox } from '@/components/form';

describe('CheckBox', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <CheckBox label="CheckBox Label" name="Checkbox" id="checkbox" />
    );
    const text = await screen.findByText('CheckBox Label');

    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show check icon when isChecked', async () => {
    render(
      <CheckBox
        label="CheckBox Label"
        name="Checkbox"
        id="checkbox"
        isChecked
      />
    );
    const check = await screen.findByRole('img');

    expect(check).toBeInTheDocument();
  });
});
