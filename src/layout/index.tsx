import { Fallback } from '@components/common/Fallback';
import { Toast } from '@components/common/Toast';
import Footer from '@components/Footer';
import Header from '@components/Header';
import LoadingModal from '@components/Modals/LoadingModal';
import { ModalContext } from '@context/modal';
import { ToastContext } from '@context/toast';
import layoutStyles from '@layout/layout.module.css';
import { ReactNode, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isLoadingShowUp } = useContext(ModalContext);

  const { toast } = useContext(ToastContext);

  return (
    <>
      <div className={layoutStyles.container}>
        <ErrorBoundary fallback={<Fallback />}>
          <Header />
        </ErrorBoundary>
        {children}
        <ErrorBoundary fallback={<Fallback />}>
          <Footer />
        </ErrorBoundary>
      </div>

      {isLoadingShowUp && (
        <ErrorBoundary fallback={<Fallback />}>
          <LoadingModal />
        </ErrorBoundary>
      )}

      <ErrorBoundary fallback={<Fallback />}>
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          toastType={toast.toastType}
        />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
