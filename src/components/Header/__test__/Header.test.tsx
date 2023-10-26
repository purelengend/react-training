import { renderer } from '@src/test/test-utils';

import Header from '..';

describe('Header test case', () => {
  it('should render correctly', () => {
    const mockHeader = renderer(<Header />);

    expect(mockHeader.toJSON()).toMatchSnapshot();
  });
});
