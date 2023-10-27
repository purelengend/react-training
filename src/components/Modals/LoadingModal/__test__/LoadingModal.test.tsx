import { customRenderer } from '@src/test/test-utils';

import LoadingModal from '..';

describe('LoadingModal test case', () => {
  it('should render correctly', () => {
    const mockLoadingModal = customRenderer(<LoadingModal />);

    expect(mockLoadingModal.toJSON()).toMatchSnapshot();
  });
});
