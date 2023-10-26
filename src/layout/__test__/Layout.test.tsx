import { renderer } from '@src/test/test-utils';

import Layout from '..';

describe('Layout test case', () => {
  it('should render correctly', () => {
    const mockLayout = renderer(<Layout>Mock Children</Layout>);

    expect(mockLayout.toJSON()).toMatchSnapshot();
  });
});
