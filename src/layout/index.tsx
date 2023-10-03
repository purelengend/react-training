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
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { mutationModal, setMutationShowUp } = useModal();
  return (
    <ModalContext.Provider value={{ mutationModal, setMutationShowUp }}>
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
      />
      <LoadingModal isVisible={false} />
      <Toast message="something" isVisible={false} isSuccess />
    </ModalContext.Provider>
  );
};

export default Layout;
