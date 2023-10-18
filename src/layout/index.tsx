import { ReactNode, memo, useContext } from 'react';
import layoutStyles from '@layout/layout.module.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { ModalContext } from '@context/modal';
import { ToastContext } from '@context/toast';
import LoadingModal from '@components/Modals/LoadingModal';
import { Toast } from '@components/common/Toast';

interface Props {
  children: ReactNode;
}

const Layout = memo(({ children }: Props) => {
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
});

Layout.whyDidYouRender = true;

export default Layout;
