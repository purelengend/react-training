import { Toast } from '@components/common/Toast';
import Footer from '@components/Footer';
import Header from '@components/Header';
import LoadingModal from '@components/Modals/LoadingModal';
import { ModalContext } from '@context/modal';
import { ToastContext } from '@context/toast';
import layoutStyles from '@layout/layout.module.css';
import { ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isLoadingShowUp } = useContext(ModalContext);

  const { toast } = useContext(ToastContext);

  return (
    <>
      <div className={layoutStyles.container}>
        <Header />
        {children}
        <Footer />
      </div>

      {isLoadingShowUp && <LoadingModal />}

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        toastType={toast.toastType}
      />
    </>
  );
};

export default Layout;
