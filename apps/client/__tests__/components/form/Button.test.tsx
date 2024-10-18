import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from '@/components/form';

describe('Button', () => {
  it('should match snapshot', async () => {
    const { container } = render(<Button>Click</Button>);
    const text = await screen.findByText('Click');

    expect(text).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should show loading icon', async () => {
    render(<Button isLoading>Click</Button>);
    const icon = await screen.findByRole('img');

    expect(icon).toBeInTheDocument();
  });
});
