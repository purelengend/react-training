import { createContext } from 'react';

export interface ToastContextProps {
  toast: {
    message: string;
    isSuccess: boolean;
    isVisible: boolean;
  };
  showToast: (message: string, isSuccess: boolean) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: {
    message: '',
    isSuccess: true,
    isVisible: false
  },
  showToast() {},
  hideToast() {}
});
