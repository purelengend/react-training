/* eslint-disable @typescript-eslint/no-unused-vars */
import type { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ImmerStateCreator<T> = StateCreator<
  T,
  [['zustand/immer', unknown]],
  [],
  T
>;
