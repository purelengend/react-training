export enum ToastActionKind {
  Toast = 'TOAST'
}

export enum ToastType {
  Success = 'SUCCESS',
  Error = 'ERROR'
}
export type ToastKind = 'SUCCESS' | 'ERROR';

export interface ToastAction {
  type: ToastActionKind;
  payload: {
    message?: string;
    toastType: ToastKind;
    isVisible: boolean;
  };
}

export interface ToastState {
  message: string;
  toastType: ToastKind;
  isVisible: boolean;
}

export const initialToastState: ToastState = {
  message: '',
  toastType: ToastType.Success,
  isVisible: false
};

export const toastReducer = (
  state: ToastState,
  action: ToastAction
): ToastState => {
  const { type, payload } = action;
  switch (type) {
    case ToastActionKind.Toast:
      return {
        ...state,
        message: payload.message ?? state.message,
        toastType: payload.toastType ?? state.toastType,
        isVisible: payload.isVisible
      };
    default:
      return state;
  }
};
