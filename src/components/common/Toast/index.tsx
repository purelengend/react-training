import { memo, useMemo } from 'react';
import toastStyles from '@components/common/Toast/toast.module.css';
import successToastIcon from '@assets/icons/check-mark-icon.svg';
import errorToastIcon from '@assets/icons/cross-icon.svg';
import { ToastKind, ToastType } from '@store/toast';

interface ToastProps {
  message: string;
  isVisible?: boolean;
  toastType: ToastKind;
}
export const Toast = memo(
  ({
    message,
    toastType = ToastType.Success,
    isVisible = false
  }: ToastProps) => {
    const toastTypeClass = useMemo(() => toastType.toLowerCase(), [toastType]);
    let toastIcon = successToastIcon;
    if (toastType === ToastType.Error) {
      toastIcon = errorToastIcon;
    }
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
              toastType === ToastType.Error && toastStyles['error-icon']
            }`}
          />
          <p>{message}</p>
        </div>
      </div>
    );
  }
);

Toast.whyDidYouRender = true;
