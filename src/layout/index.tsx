import { ReactNode } from 'react';
import layoutStyles from './layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmModal from '../components/Modals/ConfirmModal';
import MutationModal from '../components/Modals/MutationModal';
import { Toast } from '../components/common/Toast';
import LoadingModal from '../components/Modals/LoadingModal';
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
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
      <MutationModal title="Edit" isVisible={false} />
      <LoadingModal isVisible={false} />
      <Toast message="something" isVisible={false} isSuccess />
    </>
  );
};

export default Layout;
