import { createContext } from 'react';
import { ModalProp } from '@store/modal';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE
} from '@constants/modal';
import { Food } from '@components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE, defaultData } from '@constants/food';

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
  confirmModal: ModalProp & {
    dataId?: string;
  };
  setConfirmShowUp: (
    isShowUp: boolean,
    title?: string,
    dataId?: string
  ) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  mutationModal: {
    isShowUp: false,
    title: DEFAULT_ADD_MODAL_TITLE,
    prodData: defaultData
  },
  setMutationShowUp() {},
  isLoadingShowUp: false,
  setLoadingShowUp() {},
  confirmModal: {
    isShowUp: false,
    title: DEFAULT_CONFIRM_MODAL_TITLE,
    dataId: DEFAULT_FOOD_ID_VALUE
  },
  setConfirmShowUp() {}
});
