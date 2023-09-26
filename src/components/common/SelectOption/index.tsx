import { ReactNode } from 'react';
import selectOptionStyles from './select-option.module.css';
interface SelectOptionProps {
  value?: string;
  disable?: boolean;
  children: ReactNode;
}
const SelectOption = ({
  value,
  disable = false,
  children
}: SelectOptionProps) => {
  return (
    <option
      disabled={disable}
      className={selectOptionStyles['select-item']}
      value={value}
    >
      {children}
    </option>
  );
};

export default SelectOption;
