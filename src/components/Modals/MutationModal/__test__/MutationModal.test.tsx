import { Food } from '@components/common/Cards/ProductCard';
import {
  customRenderer,
  render,
  renderHook,
  screen
} from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import MutationModal, { MutationModalProps } from '..';

describe('MutationModal test case', () => {
  const {
    result: {
      current: { register, control }
    }
  } = renderHook(() => useForm<Food>());

  const mockMutationModalProps: MutationModalProps = {
    title: 'mock',
    onSubmit: vi
      .fn()
      .mockImplementation((e: FormEvent<HTMLFormElement>) =>
        e.preventDefault()
      ),
    onCancelClick: vi.fn(),
    control,
    register
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

  // it('should invoke setProductData function when filling the modal', async () => {
  //   render(<MutationModal {...mockMutationModalProps} />);

  //   const mockInputList = screen.getAllByRole('textbox');

  //   await userEvent.type(mockInputList[0], 'mock');

  //   expect(mockMutationModalProps.setProductData).toBeCalled();
  // });
});
