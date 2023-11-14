import { Fallback } from '@components/common/Fallback';
import { Toast } from '@components/common/Toast';
import Footer from '@components/Footer';
import Header from '@components/Header';
import LoadingModal from '@components/Modals/LoadingModal';
import layoutStyles from '@layout/layout.module.css';
import { useBoundStore } from '@store/index';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isLoadingShowUpZustand } = useBoundStore(
    useShallow(state => ({
      isLoadingShowUpZustand: state.isLoadingShowUp
    }))
  );

  const { toastZustand } = useBoundStore(
    useShallow(state => ({
      toastZustand: state.toast
    }))
  );

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

      {isLoadingShowUpZustand && (
        <ErrorBoundary fallback={<Fallback />}>
          <LoadingModal />
        </ErrorBoundary>
      )}

      <ErrorBoundary fallback={<Fallback />}>
        <Toast
          message={toastZustand.message}
          isVisible={toastZustand.isVisible}
          toastType={toastZustand.toastType}
        />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
