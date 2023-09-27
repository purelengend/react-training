import { ReactNode, memo } from 'react';

interface ButtonProps {
  children: ReactNode;
  className: string;
  isVisible?: boolean;
}

export const Button = memo(
  ({ children, className, isVisible = true }: ButtonProps) => {
    return isVisible && <button className={className}>{children}</button>;
  }
);
