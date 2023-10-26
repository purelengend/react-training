import { renderer } from '@src/test/test-utils';

import { Spinner } from '..';

describe('Spinner test case', () => {
  it('should render correctly without custom class name', () => {
    const mockSpinner = renderer(<Spinner />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });

  it('should accept custom class name', () => {
    const mockSpinner = renderer(<Spinner customStyle="mock-class-name" />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });
});
