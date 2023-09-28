import { ReactNode, memo } from 'react';
import selectStyles from './select.module.css';

interface SelectProps {
  children: ReactNode;
}
export const Select = memo(({ children }: SelectProps) => {
  return (
    <select id="sort" className={selectStyles['sort-select']}>
      {children}
    </select>
  );
});
