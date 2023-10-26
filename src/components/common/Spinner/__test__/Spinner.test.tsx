import { customRenderer } from '@src/test/test-utils';

import { Spinner } from '..';

describe('Spinner test case', () => {
  it('should render correctly without custom class name', () => {
    const mockSpinner = customRenderer(<Spinner />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });

  it('should accept custom class name', () => {
    const mockClassName = 'mock-class-name';
    const mockSpinner = customRenderer(<Spinner customStyle={mockClassName} />);

    expect(mockSpinner.toJSON()).toMatchSnapshot();
  });
});
