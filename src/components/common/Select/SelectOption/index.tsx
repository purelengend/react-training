import { ReactNode, memo } from 'react';
import selectOptionStyles from './select-option.module.css';
interface SelectOptionProps {
  value?: string;
  disable?: boolean;
  children: ReactNode;
}
export const SelectOption = memo(
  ({ value, disable = false, children }: SelectOptionProps) => {
    return (
      <option
        disabled={disable}
        className={selectOptionStyles['select-item']}
        value={value}
      >
        {children}
      </option>
    );
  }
);
