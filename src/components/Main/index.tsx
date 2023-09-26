import { ReactNode } from 'react';
import mainStyles from './main.module.css';
import { Spinner } from '../common/Spinner';
import { AddCard } from '../common/Cards/AddCard';
interface Props {
  children?: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        {/* <Spinner /> */}
        <AddCard>Add new dish</AddCard>
      </div>
      <button
        id="expand"
        type="button"
        className={`d-flex-center ${mainStyles['expand-btn']}`}
      >
        SHOW MORE
      </button>
    </main>
  );
};

export default Main;
