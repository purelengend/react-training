import mainStyles from '@pages/Main/main.module.css';
import { AddCard } from '@components/common/Cards/AddCard';
import { ProductCard } from '@components/common/Cards/ProductCard';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { Fragment, useContext } from 'react';
import { ModalContext } from '@context/modal';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE,
  DEFAULT_EDIT_MODAL_TITLE
} from '@constants/modal';
import { defaultData } from '@constants/food';
import useFood from '@hooks/useFood';

const MainPage = () => {
  const { foodData, isLoading, hasNextPage, fetchNextPage } = useFood();

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
        {foodData &&
          foodData.pages &&
          foodData.pages.map((page, index) => (
            <Fragment key={index}>
              {page.data.map(food => (
                <ProductCard
                  onDeleteClick={() => {
                    setConfirmShowUp(
                      true,
                      DEFAULT_CONFIRM_MODAL_TITLE,
                      food.id
                    );
                  }}
                  onEditClick={() =>
                    setMutationShowUp(true, DEFAULT_EDIT_MODAL_TITLE, food)
                  }
                  product={food}
                  key={food.id}
                />
              ))}
            </Fragment>
          ))}
      </div>
      <Button
        isVisible={hasNextPage}
        onClick={() => fetchNextPage()}
        className={`d-flex-center ${mainStyles['expand-btn']}`}
      >
        SHOW MORE
      </Button>
    </main>
  );
};

export default MainPage;
