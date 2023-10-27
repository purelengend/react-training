import { customRenderer, render, screen } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import { InputField, InputFieldProps } from '..';

describe('InputField test cases', () => {
  const mockInputProps: InputFieldProps = {
    label: 'mock',
    labelClass: 'mock-label',
    htmlFor: 'mock',
    name: 'mock',
    inputClass: 'mock-input',
    placeholder: 'mock placeholder',
    type: 'text',
    value: 'mock',
    onChange: vi.fn()
  };

  it('should render correctly', () => {
    const mockInputField = customRenderer(<InputField {...mockInputProps} />);

    expect(mockInputField.toJSON()).toMatchSnapshot();
  });

  it('should invoke onChange function when typing', async () => {
    render(<InputField {...mockInputProps} />);

    const mockInput = screen.getByLabelText('mock');

    await userEvent.type(mockInput, 'abc');

    expect(mockInputProps.onChange).toBeCalled();
  });
});
