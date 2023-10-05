import { ReactNode } from 'react';
import layoutStyles from './layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmModal from '../components/Modals/ConfirmModal';
import MutationModal from '../components/Modals/MutationModal';
import { Toast } from '../components/common/Toast';
import LoadingModal from '../components/Modals/LoadingModal';
import useModal from '../hooks/useModal';
import { ModalContext } from '../context/modal';
import useToast from '../hooks/useToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFoodById } from '../services/food.service';
import useUrl from '../hooks/useUrl';
import { UrlContext } from '../context/url';
// import { DEFAULT_PAGINATION } from '../constants/filter';
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
  const { path, setPage } = useUrl();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },
    onSuccess() {
      setPage(1);
      queryClient.resetQueries({ queryKey: ['foods', path] });
      setConfirmShowUp(false);
    }
  });
  return (
    <UrlContext.Provider value={{ path, setPage }}>
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
    </UrlContext.Provider>
  );
};

export default Layout;
