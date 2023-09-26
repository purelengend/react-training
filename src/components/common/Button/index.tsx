import { ReactNode, memo } from 'react';

interface ButtonProps {
  children: ReactNode;
  className: string;
}

export const Button = memo(({ children, className }: ButtonProps) => {
  return <button className={className}>{children}</button>;
});
