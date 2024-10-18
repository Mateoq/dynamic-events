import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import { LoadingIcon } from '@/components/ui';

describe('LoadingIcon', () => {
  it('should match snapshot', () => {
    const { container } = render(<LoadingIcon />);
    expect(container).toMatchSnapshot();
  });
});
