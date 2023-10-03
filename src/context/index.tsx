import { createContext } from 'react';
import { ModalProp } from '../store/modal';
import { DEFAULT_MUTATION_MODAL_TITLE } from '../constants/modal';

export interface ModalContextProps {
  mutationModal: ModalProp;
  setMutationShowUp: (isShowUp: boolean, title?: string) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  mutationModal: {
    isShowUp: false,
    title: DEFAULT_MUTATION_MODAL_TITLE
  },
  setMutationShowUp(isShowUp, title = DEFAULT_MUTATION_MODAL_TITLE) {
    console.log(isShowUp, title);
  }
});
