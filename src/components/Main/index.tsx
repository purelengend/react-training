import mainStyles from './main.module.css';
// import { Spinner } from '../common/Spinner';
import { AddCard } from '../common/Cards/AddCard';
import { ProductCard } from '../common/Cards/ProductCard';

const Main = () => {
  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        {/* <Spinner /> */}
        <AddCard>Add new dish</AddCard>
        <ProductCard />
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
