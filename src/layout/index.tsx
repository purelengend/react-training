import { ReactNode } from 'react';
import layoutStyles from './layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmModal from '../components/Modals/ConfirmModal';
import MutationModal from '../components/Modals/MutationModal';
import { Toast } from '../components/common/Toast';
import LoadingModal from '../components/Modals/LoadingModal';
import useModal from '../hooks/useModal';
import { ModalContext } from '../context';
import useToast from '../hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFoodById } from '../services/food.service';
import { Food } from '../components/common/Cards/ProductCard';
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const {
    mutationModal,
    setMutationShowUp,
    isLoadingShowUp,
    setLoadingShowUp,
    confirmModal,
    setConfirmShowUp
  } = useModal();

  const { toast, showToast, hideToast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },
    onSuccess(data) {
      const oldFoodList = queryClient.getQueryData<Food[]>(['foods']);
      if (oldFoodList) {
        const updatedFoodList = oldFoodList.filter(food => food.id !== data.id);
        queryClient.setQueryData<Food[]>(['foods'], updatedFoodList);
      }
      setConfirmShowUp(false);
    }
  });
  return (
    <ModalContext.Provider
      value={{
        mutationModal,
        setMutationShowUp,
        isLoadingShowUp,
        setLoadingShowUp,
        confirmModal,
        setConfirmShowUp,
        toast,
        showToast,
        hideToast
      }}
    >
      <div className={layoutStyles.container}>
        <Header />
        {children}
        <Footer />
      </div>
      <ConfirmModal
        isVisible={confirmModal.isShowUp}
        message={confirmModal.title}
        dataId={confirmModal.dataId}
        onSubmit={e => {
          e.preventDefault();
          mutation.mutate(confirmModal.dataId);
        }}
      />
      <MutationModal
        title={mutationModal.title}
        isVisible={mutationModal.isShowUp}
        prodData={mutationModal.prodData}
      />
      <LoadingModal isVisible={isLoadingShowUp} />
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        isSuccess={toast.isSuccess}
      />
    </ModalContext.Provider>
  );
};

export default Layout;
