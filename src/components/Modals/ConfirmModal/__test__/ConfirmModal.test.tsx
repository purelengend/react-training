import { customRenderer, render, screen } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import ConfirmModal, { ConfirmModalProps } from '..';

describe('ConfirmModal test case', () => {
  const mockConfirmModalProps: ConfirmModalProps = {
    dataId: '0',
    message: 'mock',
    onCancelClick: vi.fn(),
    onSubmit: vi.fn()
  };

  it('should render correctly', () => {
    const mockConfirmModal = customRenderer(
      <ConfirmModal {...mockConfirmModalProps} />
    );

    expect(mockConfirmModal.toJSON()).toMatchSnapshot();
  });

  it('should invoke onSubmit function when submitting', async () => {
    render(<ConfirmModal {...mockConfirmModalProps} />);

    const mockButtonList = screen.getAllByRole('button');

    await userEvent.click(mockButtonList[1]);

    expect(mockConfirmModalProps.onSubmit).toBeCalled();
  });

  it('should invoke onCancel function when closing', async () => {
    render(<ConfirmModal {...mockConfirmModalProps} />);

    const mockButtonList = screen.getAllByRole('button');

    await userEvent.click(mockButtonList[0]);

    expect(mockConfirmModalProps.onCancelClick).toBeCalled();
  });
});
