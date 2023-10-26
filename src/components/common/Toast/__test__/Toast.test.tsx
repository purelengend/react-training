import { renderer } from '@src/test/test-utils';
import { Toast } from '..';
import { ToastType } from '@store/toast';

describe('Toast test case', () => {
  const mockMessage = 'mocked message';
  let mockType = 'SUCCESS' as ToastType;
  it('should render correctly and be hidden by default', () => {
    const mockToast = renderer(
      <Toast message={mockMessage} toastType={mockType} />
    );

    expect(mockToast.toJSON()).toMatchSnapshot();
  });

  it('should be visible', () => {
    const mockToast = renderer(
      <Toast message={mockMessage} toastType={mockType} isVisible={true} />
    );

    expect(mockToast.toJSON()).toMatchSnapshot();
  });

  mockType = 'ERROR' as ToastType;
  it('should render error toast when toast type is ERROR', () => {
    const mockToast = renderer(
      <Toast message={mockMessage} toastType={mockType} />
    );

    expect(mockToast.toJSON()).toMatchSnapshot();
  });
});
