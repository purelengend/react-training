import { create } from 'zustand';
import { ModalSlice } from './modalSlice';
import { createModalSlice } from './modalSlice';
import { immer } from 'zustand/middleware/immer';

export const useBoundStore = create<ModalSlice>()(
  immer((...allArguments) => ({
    ...createModalSlice(...allArguments)
  }))
);
