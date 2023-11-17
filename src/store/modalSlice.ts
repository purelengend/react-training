import { Food } from '@components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE, defaultData } from '@constants/food';
import { MODAL_TITLE } from '@constants/modal';
import { MiddlewareStateCreator } from '@store/type';

export interface ModalProp {
  isShowUp: boolean;
  title: string;
}

export type ModalSlice = {
  confirmModal: Omit<ModalProp, 'title'> & {
    dataId: string;
  };

  mutationModal: ModalProp & {
    productData?: Food;
  };

  isLoadingShowUp: boolean;

  setConfirmShowUp: (isShowUp: boolean, dataId?: string) => void;

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

  setConfirmShowUp: (isShowUp, dataId) => {
    set(({ confirmModal }) => {
      confirmModal.isShowUp = isShowUp;
      confirmModal.dataId = dataId ?? confirmModal.dataId;
    });
  },

  setMutationShowUp: (isShowUp, title, productData) => {
    set(({ mutationModal }) => {
      mutationModal.isShowUp = isShowUp;
      mutationModal.title = title ?? mutationModal.title;
      mutationModal.productData = productData ?? mutationModal.productData;
    });
  },

  setLoadingShowUp: isShowUp => {
    set(state => {
      state.isLoadingShowUp = isShowUp;
    });
  }
});
