import { HTMLInputTypeAttribute, memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';
import { UseFormRegister } from 'react-hook-form';

import { Food } from '../Cards/ProductCard';

export interface InputFieldProps {
  labelClass?: string;
  inputClass?: string;
  htmlFor?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: ReactNode;
  name: keyof Food;
  register: UseFormRegister<Food>;
  isNumber?: boolean;
}

export const InputField = memo(
  ({
    labelClass,
    inputClass,
    htmlFor,
    type,
    placeholder,
    label,
    name,
    register,
    isNumber = false
  }: InputFieldProps) => {
    return (
      <>
        <label htmlFor={htmlFor} className={labelClass}>
          {label}
        </label>
        <input
          type={type}
          className={inputClass}
          id={htmlFor}
          placeholder={placeholder}
          step="any"
          {...register(name, { valueAsNumber: isNumber })}
        />
      </>
    );
  },
  isEqual
);

InputField.whyDidYouRender = true;
