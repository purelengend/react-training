import mainStyles from './main.module.css';
import { AddCard } from '../../components/common/Cards/AddCard';
import { ProductCard } from '../../components/common/Cards/ProductCard';
import { Button } from '../../components/common/Button';
import { getFoods } from '../../services/food.service';
import { Spinner } from '../../components/common/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { ModalContext } from '../../context/modal';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE,
  DEFAULT_EDIT_MODAL_TITLE
} from '../../constants/modal';
import { defaultData } from '../../constants/food';
import { UrlContext } from '../../context/url';

const MainPage = () => {
  const { path } = useContext(UrlContext);
  const { data, isLoading } = useQuery({
    queryKey: ['foods', path],
    queryFn: () => getFoods(path)
  });

  const { setMutationShowUp, setConfirmShowUp } = useContext(ModalContext);
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
              onDeleteClick={() => {
                setConfirmShowUp(true, DEFAULT_CONFIRM_MODAL_TITLE, food.id);
              }}
              onEditClick={() =>
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
