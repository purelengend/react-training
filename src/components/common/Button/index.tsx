import { ReactNode, memo } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className: string;
  isVisible?: boolean;
  dataId?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = memo(
  ({
    children,
    className,
    isVisible = true,
    dataId = '0',
    onClick = (e: React.MouseEvent<HTMLButtonElement>) =>
      console.log(e.currentTarget.getAttribute('data-id'))
  }: ButtonProps) => {
    return (
      isVisible && (
        <button
          type="button"
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
