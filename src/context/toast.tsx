import useToast from '@hooks/useToast';
import { ReactNode, createContext, memo, useMemo } from 'react';
import isEqual from 'react-fast-compare';

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

interface ToastContextProviderProps {
  children: ReactNode;
}

export const ToastContextProvider = memo(
  ({ children }: ToastContextProviderProps) => {
    const { toast, showToast, hideToast } = useToast();
    const toastContextValue = useMemo(
      () => ({
        toast,
        showToast,
        hideToast
      }),
      [toast, showToast, hideToast]
    );
    return (
      <ToastContext.Provider value={toastContextValue}>
        {children}
      </ToastContext.Provider>
    );
  },
  isEqual
);

ToastContextProvider.whyDidYouRender = true;
