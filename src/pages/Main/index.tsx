import mainStyles from './main.module.css';
import { AddCard } from '../../components/common/Cards/AddCard';
import { ProductCard } from '../../components/common/Cards/ProductCard';
import { Button } from '../../components/common/Button';
import { getFoods } from '../../services/food.service';
import { Spinner } from '../../components/common/Spinner';
import { useQuery } from '@tanstack/react-query';
import useUrl from '../../hooks/useUrl';

const MainPage = () => {
  const { path } = useUrl();
  const { data, isLoading } = useQuery({
    queryKey: ['foods', path],
    queryFn: () => getFoods(path)
  });

  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        {isLoading && <Spinner />}
        <AddCard onClick={() => console.log('add food!!')} />
        {data &&
          data.map(food => (
            <ProductCard
              onClick={() => console.log('edit food!!')}
              product={food}
              key={food.id}
            />
          ))}
      </div>
      <Button className={`d-flex-center ${mainStyles['expand-btn']}`}>
        SHOW MORE
      </Button>
    </main>
  );
};

export default MainPage;
