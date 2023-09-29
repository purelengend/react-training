import { ReactNode } from 'react';

interface InputFieldProps {
  labelClass?: string;
  inputClass?: string;
  htmlFor?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  label: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({
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
};
