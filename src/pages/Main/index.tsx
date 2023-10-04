import mainStyles from './main.module.css';
import { AddCard } from '../../components/common/Cards/AddCard';
import { ProductCard } from '../../components/common/Cards/ProductCard';
import { Button } from '../../components/common/Button';
import { getFoods } from '../../services/food.service';
import { Spinner } from '../../components/common/Spinner';
import { useQuery } from '@tanstack/react-query';
import useUrl from '../../hooks/useUrl';
import { useContext } from 'react';
import { ModalContext } from '../../context';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_EDIT_MODAL_TITLE
} from '../../constants/modal';
import { defaultData } from '../../constants/food';

const MainPage = () => {
  const { path } = useUrl();
  const { data, isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: () => getFoods(path)
  });

  const { setMutationShowUp } = useContext(ModalContext);
  return (
    <main className={`d-flex-col ${mainStyles['main-container']}`}>
      <div
        id="food-list"
        className={`d-flex ${mainStyles['main-content-wrapper']}`}
      >
        {isLoading && <Spinner />}
        <AddCard
          onClick={() =>
            setMutationShowUp(true, DEFAULT_ADD_MODAL_TITLE, defaultData)
          }
        />
        {data &&
          data.map(food => (
            <ProductCard
              onClick={() =>
                setMutationShowUp(true, DEFAULT_EDIT_MODAL_TITLE, food)
              }
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
