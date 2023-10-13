import { Food } from '@components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE, defaultData } from '@constants/food';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE
} from '@constants/modal';

export enum ModalActionKind {
  Confirm = 'CONFIRM',
  Mutation = 'MUTATION',
  Loading = 'LOADING'
}

export interface ModalAction {
  type: ModalActionKind;
  payload: {
    isShowUp: boolean;
    title?: string;
    productData?: Food;
    dataId?: string;
  };
}

export interface ModalProp {
  isShowUp: boolean;
  title: string;
}

export interface ModalState {
  confirmModal: ModalProp & {
    dataId: string;
  };
  mutationModal: ModalProp & {
    productData?: Food;
  };
  isLoadingShowUp: boolean;
}
export const initialModalState: ModalState = {
  confirmModal: {
    isShowUp: false,
    title: DEFAULT_CONFIRM_MODAL_TITLE,
    dataId: DEFAULT_FOOD_ID_VALUE
  },
  mutationModal: {
    isShowUp: false,
    title: DEFAULT_ADD_MODAL_TITLE,
    productData: defaultData
  },
  isLoadingShowUp: false
};

export const modalReducer = (
  state: ModalState,
  action: ModalAction
): ModalState => {
  const { type, payload } = action;
  switch (type) {
    case ModalActionKind.Confirm:
      return {
        ...state,
        confirmModal: {
          ...state.confirmModal,
          isShowUp: payload.isShowUp,
          title: payload.title ?? state.confirmModal.title,
          dataId: payload.dataId ?? state.confirmModal.dataId
        }
      };
    case ModalActionKind.Mutation:
      return {
        ...state,
        mutationModal: {
          isShowUp: payload.isShowUp,
          title: payload.title ?? state.mutationModal.title,
          productData: payload.productData ?? state.mutationModal.productData
        }
      };
    case ModalActionKind.Loading:
      return {
        ...state,
        isLoadingShowUp: payload.isShowUp
      };
    default:
      return state;
  }
};
