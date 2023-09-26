import { ReactNode, memo } from 'react';
import layoutStyles from './layout.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DeleteModal from '../components/Modals/DeleteModal';
interface Props {
  children: ReactNode;
}

const Layout = memo(({ children }: Props) => {
  return (
    <>
      <div className={layoutStyles.container}>
        <Header>Foods Management</Header>
        {children}
        <Footer />
      </div>
      <DeleteModal />
    </>
  );
});

export default Layout;
