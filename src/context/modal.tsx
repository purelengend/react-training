import { Food } from '@components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE, defaultData } from '@constants/food';
import { MODAL_TITLE } from '@constants/modal';
import useModal from '@hooks/useModal';
import { ModalProp } from '@store/modal';
import { createContext, memo, ReactNode, useMemo } from 'react';
import isEqual from 'react-fast-compare';

interface ModalContextProps {
  mutationModal: ModalProp & {
    productData?: Food;
  };
  setMutationShowUp: (
    isShowUp: boolean,
    title?: string,
    productData?: Food
  ) => void;
  isLoadingShowUp: boolean;
  setLoadingShowUp: (isShowUp: boolean) => void;
  confirmModal: ModalProp & {
    dataId: string;
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
    title: MODAL_TITLE.ADD,
    productData: defaultData
  },
  setMutationShowUp: () => {},
  isLoadingShowUp: false,
  setLoadingShowUp: () => {},
  confirmModal: {
    isShowUp: false,
    title: MODAL_TITLE.ADD,
    dataId: DEFAULT_FOOD_ID_VALUE
  },
  setConfirmShowUp: () => {}
});

interface ModalContextProviderProps {
  children: ReactNode;
}

export const ModalContextProvider = memo(
  ({ children }: ModalContextProviderProps) => {
    const {
      mutationModal,
      setMutationShowUp,
      isLoadingShowUp,
      setLoadingShowUp,
      confirmModal,
      setConfirmShowUp
    } = useModal();

    const modalContextValue = useMemo(
      () => ({
        mutationModal,
        setMutationShowUp,
        isLoadingShowUp,
        setLoadingShowUp,
        confirmModal,
        setConfirmShowUp
      }),
      [
        confirmModal,
        isLoadingShowUp,
        mutationModal,
        setConfirmShowUp,
        setLoadingShowUp,
        setMutationShowUp
      ]
    );

    return (
      <ModalContext.Provider value={modalContextValue}>
        {children}
      </ModalContext.Provider>
    );
  },
  isEqual
);

ModalContextProvider.whyDidYouRender = true;
