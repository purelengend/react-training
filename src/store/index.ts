import { create } from 'zustand';
import { ModalSlice } from './modalSlice';
import { createModalSlice } from './modalSlice';
import { UrlSlice, createUrlSlice } from './urlSlice';
import { immer } from 'zustand/middleware/immer';

export const useBoundStore = create<ModalSlice & UrlSlice>()(
  immer((...allArguments) => ({
    ...createModalSlice(...allArguments),
    ...createUrlSlice(...allArguments)
  }))
);
