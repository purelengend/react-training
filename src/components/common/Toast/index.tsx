import { memo } from 'react';
import toastStyles from '@components/common/Toast/toast.module.css';
import successToastIcon from '@assets/icons/check-mark-icon.svg';
import errorToastIcon from '@assets/icons/cross-icon.svg';

interface ToastProps {
  message: string;
  isVisible?: boolean;
  isSuccess?: boolean;
}
export const Toast = memo(
  ({ message, isSuccess = true, isVisible = false }: ToastProps) => {
    const toastTypeClass = isSuccess ? 'success' : 'error';
    const toastIcon = isSuccess ? successToastIcon : errorToastIcon;
    return (
      <div
        style={{
          visibility: isVisible ? 'visible' : 'hidden',
          opacity: isVisible ? '1' : '0'
        }}
        className={`d-flex ${toastStyles['toast-container']} ${toastStyles[toastTypeClass]}`}
      >
        <div className={`d-flex ${toastStyles['toast-message-wrapper']}`}>
          <img
            src={toastIcon}
            alt="Check Mark Icon"
            className={`primary-icon ${
              !isSuccess && toastStyles['error-icon']
            }`}
          />
          <p>{message}</p>
        </div>
      </div>
    );
  }
);
