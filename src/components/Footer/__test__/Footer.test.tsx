import { customRenderer } from '@src/test/test-utils';

import Footer from '..';

describe('Footer test case', () => {
  it('should render correctly', () => {
    const mockFooter = customRenderer(<Footer />);

    expect(mockFooter.toJSON()).toMatchSnapshot();
  });
});
