import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TextInput } from '@/components/form';

describe('TextInput', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <TextInput
        label="TextInput Label"
        name="textinput"
        id="textinput"
        message="Error"
      />
    );
    const label = await screen.findByText('TextInput Label');

    expect(label).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
