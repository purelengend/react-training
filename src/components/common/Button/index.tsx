import { ReactNode, memo } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className: string;
  isVisible?: boolean;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo(
  ({
    children,
    className,
    isVisible = true,
    handleClick = () => {}
  }: ButtonProps) => {
    return (
      isVisible && (
        <button className={className} onClick={handleClick}>
          {children}
        </button>
      )
    );
  }
);
