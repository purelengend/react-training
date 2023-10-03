import { ReactNode, memo } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className: string;
  type?: 'submit' | 'reset' | 'button';
  isVisible?: boolean;
  dataId?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo(
  ({
    children,
    className,
    type = 'button',
    isVisible = true,
    dataId = '0',
    onClick = () => {}
  }: ButtonProps) => {
    return (
      isVisible && (
        <button
          type={type}
          className={className}
          onClick={onClick}
          data-id={dataId}
        >
          {children}
        </button>
      )
    );
  }
);
