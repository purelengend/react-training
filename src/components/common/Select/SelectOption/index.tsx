import { ReactNode, memo } from 'react';
import selectOptionStyles from '@components/common/Select/SelectOption/select-option.module.css';
import isEqual from 'react-fast-compare';
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
  },
  isEqual
);

SelectOption.whyDidYouRender = true;
