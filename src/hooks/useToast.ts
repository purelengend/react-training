import { useCallback, useReducer } from 'react';
import {
  ToastActionKind,
  ToastKind,
  initialToastState,
  toastReducer
} from '@store/toast';

const useToast = () => {
  const [{ message, toastType, isVisible }, dispatch] = useReducer(
    toastReducer,
    initialToastState
  );

  const showToast = useCallback(
    (message: string, toastType: ToastKind) => {
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
