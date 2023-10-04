import { Food } from '../components/common/Cards/ProductCard';
import { defaultData } from '../constants/food';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE
} from '../constants/modal';

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
    prodData?: Food;
  };
}

export interface ModalProp {
  isShowUp: boolean;
  title: string;
}

export interface ModalState {
  confirmModal: ModalProp;
  mutationModal: ModalProp & {
    prodData?: Food;
  };
  isLoadingShowUp: boolean;
}
export const initialModalState: ModalState = {
  confirmModal: {
    isShowUp: false,
    title: DEFAULT_CONFIRM_MODAL_TITLE
  },
  mutationModal: {
    isShowUp: false,
    title: DEFAULT_ADD_MODAL_TITLE,
    prodData: defaultData
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
          title: payload.title ?? state.confirmModal.title
        }
      };
    case ModalActionKind.Mutation:
      return {
        ...state,
        mutationModal: {
          isShowUp: payload.isShowUp,
          title: payload.title ?? state.mutationModal.title,
          prodData: payload.prodData ?? state.mutationModal.prodData
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
