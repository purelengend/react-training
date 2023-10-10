import { ReactNode, memo } from 'react';
import isEqual from 'react-fast-compare';

export interface ButtonProps {
  children: ReactNode;
  className: string;
  type?: 'submit' | 'reset' | 'button';
  isVisible?: boolean;
  isDisabled?: boolean;
  dataId?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo(
  ({
    children,
    className,
    type = 'button',
    isVisible = true,
    isDisabled = false,
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
          disabled={isDisabled}
        >
          {children}
        </button>
      )
    );
  },
  isEqual
);

Button.whyDidYouRender = true;
