import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Modal } from '@/components/ui';
import { sleep } from '@/utils/functions';

describe('Modal', () => {
  it('should match snapshot', async () => {
    const { container } = render(
      <Modal isOpen title="Title" onClose={() => {}} />
    );

    // Wait for the fade in animation to finish
    await sleep(1000);
    const title = await screen.findByText('Title');

    expect(title).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
