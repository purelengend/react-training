import { ReactNode, lazy, memo, useContext } from 'react';
import layoutStyles from '@layout/layout.module.css';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { ModalContext } from '@context/modal';

import isEqual from 'react-fast-compare';
import { ToastContext } from '@context/toast';

interface Props {
  children: ReactNode;
}

const LoadingModal = lazy(() => import('@components/Modals/LoadingModal'));
const Toast = lazy(() =>
  import('@components/common/Toast').then(module => ({ default: module.Toast }))
);

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

      <LoadingModal isVisible={isLoadingShowUp} />

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        toastType={toast.toastType}
      />
    </>
  );
}, isEqual);

Layout.whyDidYouRender = true;
export default Layout;
