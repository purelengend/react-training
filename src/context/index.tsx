import { createContext } from 'react';
import { ModalProp } from '../store/modal';
import { DEFAULT_ADD_MODAL_TITLE } from '../constants/modal';
import { Food } from '../components/common/Cards/ProductCard';
import { defaultData } from '../constants/food';

export interface ModalContextProps {
  mutationModal: ModalProp & {
    prodData?: Food;
  };
  setMutationShowUp: (
    isShowUp: boolean,
    title?: string,
    prodData?: Food
  ) => void;
  isLoadingShowUp: boolean;
  setLoadingShowUp: (isShowUp: boolean) => void;
  toast: {
    message: string;
    isSuccess: boolean;
    isVisible: boolean;
  };
  showToast: (message: string, isSuccess: boolean) => void;
  hideToast: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
  mutationModal: {
    isShowUp: false,
    title: DEFAULT_ADD_MODAL_TITLE,
    prodData: defaultData
  },
  setMutationShowUp(isShowUp) {
    console.log(isShowUp);
  },
  isLoadingShowUp: false,
  setLoadingShowUp(isShowUp) {
    console.log(isShowUp);
  },
  toast: {
    message: '',
    isSuccess: true,
    isVisible: false
  },
  showToast(message, isSuccess) {
    console.log(message, isSuccess);
  },
  hideToast() {}
});
