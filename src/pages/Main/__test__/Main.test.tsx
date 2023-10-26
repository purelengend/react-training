import { renderer } from '@src/test/test-utils';

import MainPage from '..';

describe('Main Page test case', () => {
  it('should render correctly', () => {
    const mockMainPage = renderer(<MainPage />);

    expect(mockMainPage.toJSON()).toMatchSnapshot();
  });
});
