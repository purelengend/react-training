import { TOAST_TIME } from '@constants/toast';

import { MiddlewareStateCreator } from './type';

export enum ToastType {
  Success = 'SUCCESS',
  Error = 'ERROR'
}

export interface ToastState {
  message: string;
  toastType: ToastType;
  isVisible: boolean;
}

export type ToastSlice = {
  toast: ToastState;
  showToast: (message: string, toastType: ToastType) => void;
  hideToast: () => void;
};

export const initialToastSlice: ToastSlice = {
  toast: {
    message: '',
    toastType: ToastType.Success,
    isVisible: false
  },
  showToast: () => {},
  hideToast: () => {}
};

export const createToastSlice: MiddlewareStateCreator<ToastSlice> = set => ({
  ...initialToastSlice,

  showToast: (message, toastType) => {
    set(state => {
      state.toast.message = message;
      state.toast.toastType = toastType;
      state.toast.isVisible = true;
    });
  },

  hideToast: () => {
    setTimeout(() => {
      set(state => {
        state.toast.isVisible = false;
      });
    }, TOAST_TIME);
  }
});
