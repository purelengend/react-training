import { renderer } from '@src/test/test-utils';

import { Spinner } from '..';

describe('Spinner test case', () => {
  it('should render correctly without custom class name', () => {
    const mockSpinner = renderer(<Spinner />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });

  const mockClassName = 'mock-class-name';
  it('should accept custom class name', () => {
    const mockSpinner = renderer(<Spinner customStyle={mockClassName} />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });
});
