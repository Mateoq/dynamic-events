import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Toast } from '@/components/ui';
import { ToastType } from '@/types';
import { sleep } from '@/utils/functions';

describe('Toast', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <Toast isOpen type={ToastType.SUCCESS} text="Message" />
    );

    // Wait for fade in animation to be completed
    await sleep(400);
    const message = await screen.findByText('Message');

    expect(message).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
