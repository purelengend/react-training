import { ReactNode, lazy, memo, useContext } from 'react';
import layoutStyles from '@layout/layout.module.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { ModalContext } from '@context/modal';
import { deleteFoodById } from '@services/food.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TOAST_DELETE_MSG,
  TOAST_ERROR_MSG,
  TOAST_TIME
} from '@constants/toast';
import isEqual from 'react-fast-compare';
import { ToastContext } from '@context/toast';
interface Props {
  children: ReactNode;
}

const ConfirmModal = lazy(() => import('@components/Modals/ConfirmModal'));
const MutationModal = lazy(() => import('@components/Modals/MutationModal'));
const LoadingModal = lazy(() => import('@components/Modals/LoadingModal'));
const Toast = lazy(() =>
  import('@components/common/Toast').then(module => ({ default: module.Toast }))
);

const Layout = memo(({ children }: Props) => {
  const {
    mutationModal,
    isLoadingShowUp,
    setLoadingShowUp,
    confirmModal,
    setConfirmShowUp
  } = useContext(ModalContext);

  const { toast, showToast, hideToast } = useContext(ToastContext);

  const queryClient = useQueryClient();

  const { mutate: deleteFood } = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },
    onMutate: () => {
      setLoadingShowUp(true);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['foods'] });
      setConfirmShowUp(false);
      setLoadingShowUp(false);
      showToast(TOAST_DELETE_MSG, true);
      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    onError: () => {
      setConfirmShowUp(false);
      setLoadingShowUp(false);
      showToast(TOAST_ERROR_MSG, false);
      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    networkMode: 'always'
  });

  return (
    <>
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
    </>
  );
}, isEqual);

Layout.whyDidYouRender = {
  logOnDifferentValues: true
};
export default Layout;
