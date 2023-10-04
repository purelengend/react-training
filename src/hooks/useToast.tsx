import { useCallback, useReducer } from 'react';
import {
  ToastActionKind,
  initialToastState,
  toastReducer
} from '../store/toast';

const useToast = () => {
  const [state, dispatch] = useReducer(toastReducer, initialToastState);
  const { message, isSuccess, isVisible } = state;

  const showToast = useCallback(
    (message: string, isSuccess: boolean) => {
      dispatch({
        type: ToastActionKind.Toast,
        payload: {
          message,
          isSuccess,
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
        isVisible: false
      }
    });
  }, [dispatch]);

  return {
    toast: {
      message,
      isSuccess,
      isVisible
    },
    showToast,
    hideToast
  };
};

export default useToast;
