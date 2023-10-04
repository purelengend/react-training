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
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const {
    mutationModal,
    setMutationShowUp,
    isLoadingShowUp,
    setLoadingShowUp
  } = useModal();

  const { toast, showToast, hideToast } = useToast();

  return (
    <ModalContext.Provider
      value={{
        mutationModal,
        setMutationShowUp,
        isLoadingShowUp,
        setLoadingShowUp,
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
        isVisible={false}
        message="Are you sure you want to delete this food?"
        onSubmit={e => {
          e.preventDefault();
          console.log(e.currentTarget.elements[0]);
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
