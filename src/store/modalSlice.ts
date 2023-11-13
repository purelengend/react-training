import { Food } from '@components/common/Cards/ProductCard';

import { ModalProp } from './modal';
import { MODAL_TITLE } from '@constants/modal';
import { DEFAULT_FOOD_ID_VALUE, defaultData } from '@constants/food';
import { MiddlewareStateCreator } from '@store/type';

export type ModalSlice = {
  confirmModal: ModalProp & {
    dataId: string;
  };

  mutationModal: ModalProp & {
    productData?: Food;
  };

  isLoadingShowUp: boolean;

  setConfirmShowUp: (
    isShowUp: boolean,
    title?: string,
    dataId?: string
  ) => void;

  setMutationShowUp: (
    isShowUp: boolean,
    title?: string,
    productData?: Food
  ) => void;

  setLoadingShowUp: (isShowUp: boolean) => void;
};

export const initialModalSlice: ModalSlice = {
  confirmModal: {
    isShowUp: false,
    title: MODAL_TITLE.CONFIRM,
    dataId: DEFAULT_FOOD_ID_VALUE
  },

  mutationModal: {
    isShowUp: false,
    title: MODAL_TITLE.ADD,
    productData: defaultData
  },

  isLoadingShowUp: false,

  setConfirmShowUp: () => {},

  setMutationShowUp: () => {},

  setLoadingShowUp: () => {}
};

export const createModalSlice: MiddlewareStateCreator<ModalSlice> = set => ({
  ...initialModalSlice,

  setConfirmShowUp: (isShowUp, title, dataId) => {
    set(state => {
      state.confirmModal.isShowUp = isShowUp;
      state.confirmModal.title = title ?? state.confirmModal.title;
      state.confirmModal.dataId = dataId ?? state.confirmModal.dataId;
    });
  },

  setMutationShowUp: (isShowUp, title, productData) => {
    set(state => {
      state.mutationModal.isShowUp = isShowUp;
      state.mutationModal.title = title ?? state.mutationModal.title;
      state.mutationModal.productData =
        productData ?? state.mutationModal.productData;
    });
  },

  setLoadingShowUp: isShowUp => {
    set(state => {
      state.isLoadingShowUp = isShowUp;
    });
  }
});
