import { ReactNode, memo } from 'react';
import selectStyles from '@components/common/Select/select.module.css';

interface SelectProps {
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
export const Select = memo(({ children, onChange, value }: SelectProps) => {
  return (
    <select
      aria-label="sort"
      value={value}
      onChange={onChange}
      id="sort"
      className={selectStyles['sort-select']}
    >
      {children}
    </select>
  );
});
