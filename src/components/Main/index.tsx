import mainStyles from './main.module.css';
// import { Spinner } from '../common/Spinner';
import { AddCard } from '../common/Cards/AddCard';
import { Food, ProductCard } from '../common/Cards/ProductCard';
import { Button } from '../common/Button';

const testFood: Food = {
  id: '0',
  name: 'Pasta',
  price: 232,
  quantity: 123,
  imageUrl:
    'https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80',
  createdAt: new Date()
};
const Main = () => {
  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        {/* <Spinner /> */}
        <AddCard>Add new dish</AddCard>
        <ProductCard product={testFood} />
      </div>
      <Button className={`d-flex-center ${mainStyles['expand-btn']}`}>
        SHOW MORE
      </Button>
    </main>
  );
};

export default Main;
