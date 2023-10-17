import { memo, useMemo } from 'react';
import toastStyles from '@components/common/Toast/toast.module.css';
import successToastIcon from '@assets/icons/check-mark-icon.svg';
import errorToastIcon from '@assets/icons/cross-icon.svg';
import { ToastKind, ToastType } from '@store/toast';
import isEqual from 'react-fast-compare';

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

    const toastIcon = useMemo(() => {
      if (toastType === ToastType.Error) {
        return errorToastIcon;
      } else {
        return successToastIcon;
      }
    }, [toastType]);

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
  },
  isEqual
);

Toast.whyDidYouRender = true;
