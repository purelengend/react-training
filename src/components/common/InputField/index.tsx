import { memo, ReactNode } from 'react';
import isEqual from 'react-fast-compare';

interface InputFieldProps {
  labelClass?: string;
  inputClass?: string;
  htmlFor?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  label?: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = memo(
  ({
    labelClass,
    inputClass,
    htmlFor,
    type,
    name,
    placeholder,
    value,
    onChange,
    label
  }: InputFieldProps) => {
    return (
      <>
        <label htmlFor={htmlFor} className={labelClass}>
          {label}
        </label>
        <input
          onChange={onChange}
          type={type}
          className={inputClass}
          id={htmlFor}
          name={name}
          value={value}
          placeholder={placeholder}
          step="any"
        />
      </>
    );
  },
  isEqual
);

InputField.whyDidYouRender = true;
