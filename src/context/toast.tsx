import useToast from '@hooks/useToast';
import { ToastType } from '@store/toast';
import { createContext, memo, ReactNode, useMemo } from 'react';
import isEqual from 'react-fast-compare';

interface ToastContextProps {
  toast: {
    message: string;
    toastType: ToastType;
    isVisible: boolean;
  };
  showToast: (message: string, toastType: ToastType) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextProps>({
  toast: {
    message: '',
    toastType: ToastType.Success,
    isVisible: false
  },
  showToast: () => {},
  hideToast: () => {}
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
