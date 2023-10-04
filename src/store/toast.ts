export enum ToastActionKind {
  Toast = 'TOAST'
}

export interface ToastAction {
  type: ToastActionKind;
  payload: {
    message?: string;
    isSuccess?: boolean;
    isVisible: boolean;
  };
}

export interface ToastState {
  message: string;
  isSuccess: boolean;
  isVisible: boolean;
}

export const initialToastState: ToastState = {
  message: '',
  isSuccess: true,
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
        isSuccess: payload.isSuccess ?? state.isSuccess,
        isVisible: payload.isVisible
      };
    default:
      return state;
  }
};
