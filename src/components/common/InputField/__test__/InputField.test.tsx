import { customRenderer } from '@src/test/test-utils';

import { InputField, InputFieldProps } from '..';

describe('InputField test cases', () => {
  const mockInputProps: InputFieldProps = {
    label: 'mock',
    labelClass: 'mock-label',
    htmlFor: 'mock',
    inputClass: 'mock-input',
    placeholder: 'mock placeholder',
    type: 'text',
    name: 'name'
  };

  it('should render correctly', () => {
    const mockInputField = customRenderer(<InputField {...mockInputProps} />);

    expect(mockInputField.toJSON()).toMatchSnapshot();
  });
});
