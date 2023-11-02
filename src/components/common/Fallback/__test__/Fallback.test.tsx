import { customRenderer } from '@src/test/test-utils';

import { Fallback } from '..';

describe('Fallback test case', () => {
  it('should render correctly', () => {
    const mockFallback = customRenderer(<Fallback />);

    expect(mockFallback.toJSON()).toMatchSnapshot();
  });
});
