import { ReactNode } from 'react';
import layoutStyles from '@layout/layout.module.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ConfirmModal from '@components/Modals/ConfirmModal';
import MutationModal from '@components/Modals/MutationModal';
import { Toast } from '@components/common/Toast';
import LoadingModal from '@components/Modals/LoadingModal';
import useModal from '@hooks/useModal';
import { ModalContext } from '@context/modal';
import useToast from '@hooks/useToast';
import useUrl from '@hooks/useUrl';
import { UrlContext } from '@context/url';
import { deleteFoodById } from '@services/food.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TOAST_DELETE_MSG, TOAST_TIME } from '@constants/toast';
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
  const { path, setPage, resetPage, sortFilter, setSortFilter } = useUrl();

  const queryClient = useQueryClient();

  const { mutate: deleteFood } = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },
    onMutate() {
      setLoadingShowUp(true);
    },
    onSuccess() {
      queryClient.resetQueries({ queryKey: ['foods'] });
      setConfirmShowUp(false);
      setLoadingShowUp(false);
      showToast(TOAST_DELETE_MSG, true);
      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    }
  });

  return (
    <UrlContext.Provider
      value={{ path, setPage, resetPage, sortFilter, setSortFilter }}
    >
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
            deleteFood(confirmModal.dataId);
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
    </UrlContext.Provider>
  );
};

export default Layout;
