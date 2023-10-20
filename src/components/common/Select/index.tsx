import selectStyles from '@components/common/Select/select.module.css';
import { memo, ReactNode } from 'react';

import { SelectOption } from './SelectOption';

export interface SelectOptionProps {
  disabled: boolean;
  value: string | undefined;
  label: ReactNode;
}

interface SelectProps {
  selectOptions: Array<SelectOptionProps>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

export const Select = memo(
  ({ selectOptions, onChange, value }: SelectProps) => {
    return (
      <select
        aria-label="sort"
        value={value}
        onChange={onChange}
        id="sort"
        className={selectStyles['sort-select']}
      >
        {selectOptions.map((option, index) => (
          <SelectOption
            key={index}
            disable={option.disabled}
            value={option.value}
          >
            {option.label}
          </SelectOption>
        ))}
      </select>
    );
  }
);

Select.whyDidYouRender = true;
