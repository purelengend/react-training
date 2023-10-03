import { useReducer } from 'react';
import {
  ModalActionKind,
  initialModalState,
  modalReducer
} from '../store/modal';

const useModal = () => {
  const [state, dispatch] = useReducer(modalReducer, initialModalState);
  const { confirmModal, mutationModal, isLoadingShowUp } = state;
  const setConfirmShowUp = (isShowUp: boolean, title?: string) => {
    dispatch({
      type: ModalActionKind.Confirm,
      payload: {
        isShowUp,
        title
      }
    });
  };
  const setMutationShowUp = (isShowUp: boolean, title?: string) => {
    dispatch({
      type: ModalActionKind.Mutation,
      payload: {
        isShowUp,
        title
      }
    });
  };
  const setLoadingShowUp = (isShowUp: boolean) => {
    dispatch({
      type: ModalActionKind.Loading,
      payload: { isShowUp }
    });
  };
  return {
    confirmModal,
    mutationModal,
    isLoadingShowUp,
    setConfirmShowUp,
    setMutationShowUp,
    setLoadingShowUp
  };
};

export default useModal;
