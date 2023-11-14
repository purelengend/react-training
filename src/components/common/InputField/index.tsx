import { HTMLInputTypeAttribute, memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';
import { useController, UseControllerProps } from 'react-hook-form';

import { Food } from '../Cards/ProductCard';

export interface InputFieldProps {
  labelClass?: string;
  inputClass?: string;
  htmlFor?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: ReactNode;
}

export const InputField = memo(
  ({
    labelClass,
    inputClass,
    htmlFor,
    type,
    placeholder,
    label,
    ...props
  }: InputFieldProps & UseControllerProps<Food>) => {
    const { field } = useController(props);

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
          {...field}
        />
      </>
    );
  },
  isEqual
);

InputField.whyDidYouRender = true;
