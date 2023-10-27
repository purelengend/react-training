import { defaultData, defaultFoodErrorMessage } from '@constants/food';
import { customRenderer, render, screen } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import MutationModal, { MutationModalProps } from '..';

describe('MutationModal test case', () => {
  const mockMutationModalProps: MutationModalProps = {
    title: 'mock',
    productData: defaultData,
    errorProductMessage: defaultFoodErrorMessage,
    onSubmit: vi.fn(),
    onCancelClick: vi.fn(),
    setProductData: vi.fn()
  };

  it('should render correctly', () => {
    const mockMutationModal = customRenderer(
      <MutationModal {...mockMutationModalProps} />
    );

    expect(mockMutationModal.toJSON()).toMatchSnapshot();
  });

  it('should invoke onSubmit function when submitting', async () => {
    render(<MutationModal {...mockMutationModalProps} />);

    const mockButtonList = screen.getAllByRole('button');

    await userEvent.click(mockButtonList[1]);

    expect(mockMutationModalProps.onSubmit).toBeCalled();
  });

  it('should invoke onCancelClick function when closing the modal', async () => {
    render(<MutationModal {...mockMutationModalProps} />);

    const mockButtonList = screen.getAllByRole('button');

    await userEvent.click(mockButtonList[0]);

    expect(mockMutationModalProps.onCancelClick).toBeCalled();
  });

  it('should invoke setProductData function when filling the modal', async () => {
    render(<MutationModal {...mockMutationModalProps} />);

    const mockInputList = screen.getAllByRole('textbox');

    await userEvent.type(mockInputList[0], 'mock');

    expect(mockMutationModalProps.setProductData).toBeCalled();
  });
});
