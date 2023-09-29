import { ReactNode } from 'react';
import layoutStyles from './layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DeleteModal from '../components/Modals/DeleteModal';
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
      <DeleteModal isVisible={false} />
      <MutationModal title="Edit" isVisible={false} />
      <LoadingModal isVisible={false} />
      <Toast message="something" isVisible={false} />
    </>
  );
};

export default Layout;
