import { useCallback, useMemo, useReducer } from 'react';
import {
  ToastActionKind,
  ToastType,
  initialToastState,
  toastReducer
} from '@store/toast';

const useToast = () => {
  const [toast, dispatch] = useReducer(toastReducer, initialToastState);

  const { message, toastType, isVisible } = useMemo(() => toast, [toast]);

  const showToast = useCallback(
    (message: string, toastType: ToastType) => {
      dispatch({
        type: ToastActionKind.Toast,
        payload: {
          message,
          toastType,
          isVisible: true
        }
      });
    },
    [dispatch]
  );

  const hideToast = useCallback(() => {
    dispatch({
      type: ToastActionKind.Toast,
      payload: {
        isVisible: false,
        toastType
      }
    });
  }, [dispatch, toastType]);

  return {
    toast: {
      message,
      toastType,
      isVisible
    },
    showToast,
    hideToast
  };
};

export default useToast;
