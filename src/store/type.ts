import type { StateCreator } from 'zustand';
export type MiddlewareStateCreator<T> = StateCreator<
  T,
  [['zustand/immer', unknown]],
  [],
  T
>;
