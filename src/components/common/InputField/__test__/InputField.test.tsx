import { Food } from '@components/common/Cards/ProductCard';
import { customRenderer, renderHook } from '@src/test/test-utils';
import { useForm } from 'react-hook-form';

import { InputField, InputFieldProps } from '..';

describe('InputField test cases', () => {
  const {
    result: {
      current: { register }
    }
  } = renderHook(() => useForm<Food>());
  const mockInputProps: InputFieldProps = {
    label: 'mock',
    labelClass: 'mock-label',
    htmlFor: 'mock',
    inputClass: 'mock-input',
    placeholder: 'mock placeholder',
    type: 'text',
    name: 'name',
    register: register,
    typeValue: 'valueAsNumber'
  };

  it('should render correctly', () => {
    const mockInputField = customRenderer(<InputField {...mockInputProps} />);

    expect(mockInputField.toJSON()).toMatchSnapshot();
  });
});
