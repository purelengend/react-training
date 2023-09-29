import { ReactNode } from 'react';

interface InputFieldProps {
  labelClass?: string;
  inputClass?: string;
  htmlFor?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  children: ReactNode;
}

export const InputField = ({
  labelClass,
  inputClass,
  htmlFor,
  type,
  name,
  placeholder,
  value,
  children
}: InputFieldProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className={labelClass}>
        {children}
      </label>
      <input
        type={type}
        className={inputClass}
        id={htmlFor}
        name={name}
        value={value}
        placeholder={placeholder}
        step='any'
      />
    </>
  );
};
