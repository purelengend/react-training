import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { createModalSlice, ModalSlice } from './modalSlice';
import { createToastSlice, ToastSlice } from './toastSlice';
import { createUrlSlice, UrlSlice } from './urlSlice';

export const useBoundStore = create<ModalSlice & UrlSlice & ToastSlice>()(
  immer((...allArguments) => ({
    ...createModalSlice(...allArguments),
    ...createUrlSlice(...allArguments),
    ...createToastSlice(...allArguments)
  }))
);
