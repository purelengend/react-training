import { useCallback, useReducer } from 'react';
import { ModalActionKind, initialModalState, modalReducer } from '@store/modal';
import { Food } from '@components/common/Cards/ProductCard';

const useModal = () => {
  const [{ confirmModal, mutationModal, isLoadingShowUp }, dispatch] =
    useReducer(modalReducer, initialModalState);

  const setConfirmShowUp = useCallback(
    (isShowUp: boolean, title?: string, dataId?: string) => {
      dispatch({
        type: ModalActionKind.Confirm,
        payload: {
          isShowUp,
          title,
          dataId
        }
      });
    },
    [dispatch]
  );

  const setMutationShowUp = useCallback(
    (isShowUp: boolean, title?: string, productData?: Food) => {
      dispatch({
        type: ModalActionKind.Mutation,
        payload: {
          isShowUp,
          title,
          productData
        }
      });
    },
    [dispatch]
  );

  const setLoadingShowUp = useCallback(
    (isShowUp: boolean) => {
      dispatch({
        type: ModalActionKind.Loading,
        payload: { isShowUp }
      });
    },
    [dispatch]
  );

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
