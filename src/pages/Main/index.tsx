import mainStyles from '@pages/Main/main.module.css';
import { AddCard } from '@components/common/Cards/AddCard';
import { Food, ProductCard } from '@components/common/Cards/ProductCard';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import {
  FormEvent,
  Fragment,
  Suspense,
  lazy,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { ModalContext } from '@context/modal';
import {
  DEFAULT_ADD_MODAL_TITLE,
  DEFAULT_CONFIRM_MODAL_TITLE,
  DEFAULT_EDIT_MODAL_TITLE
} from '@constants/modal';
import {
  EMPTY_MSG,
  defaultData,
  defaultFoodErrorMessage
} from '@constants/food';
import useFood, { InfiniteQueryProps } from '@hooks/useFood';
import { ToastContext } from '@context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFoodById, mutationFood } from '@services/food.service';
import {
  TOAST_ADD_MSG,
  TOAST_DELETE_MSG,
  TOAST_EDIT_MSG,
  TOAST_ERROR_MSG,
  TOAST_TIME
} from '@constants/toast';
import LoadingModal from '@components/Modals/LoadingModal';
import { validateForm } from '@helpers/form-validation';
import { ToastType } from '@store/toast';

const ConfirmModal = lazy(() => import('@components/Modals/ConfirmModal'));
const MutationModal = lazy(() => import('@components/Modals/MutationModal'));

const MainPage = () => {
  const {
    foodData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useFood();

  const {
    mutationModal,
    setMutationShowUp,
    setLoadingShowUp,
    confirmModal,
    setConfirmShowUp
  } = useContext(ModalContext);

  const { showToast, hideToast } = useContext(ToastContext);

  const queryClient = useQueryClient();

  const [mutationFoodData, setMutationFoodData] = useState(defaultData);

  const [errorMutationFoodMessage, setErrorMutationFoodMessage] = useState(
    defaultFoodErrorMessage
  );

  useEffect(() => {
    if (mutationModal.productData)
      setMutationFoodData(mutationModal.productData);
  }, [mutationModal.productData]);

  const onCancelClick = useCallback(() => {
    if (mutationFoodData.id === defaultData.id) {
      setMutationFoodData(defaultData);
    } else {
      setMutationFoodData(mutationFoodData);
    }

    setErrorMutationFoodMessage(defaultFoodErrorMessage);

    setMutationShowUp(false);
  }, [mutationFoodData, setMutationShowUp]);

  const { mutate: mutateFood } = useMutation({
    mutationFn: (input: Food) => {
      return mutationFood(input);
    },
    onMutate: () => {
      setLoadingShowUp(true);
    },
    onSuccess: data => {
      const currentFoodData = queryClient.getQueryData<
        InfiniteQueryProps<Food>
      >(['foods']);

      let toastMessage = '';
      if (currentFoodData) {
        let existedFoodIndex = -1;

        // Loop all food pages, check the data prop and loop over all food items in data to find the existed food
        for (const foodPage of currentFoodData.pages) {
          const foundedFoodIndex = foodPage.data.findIndex(food => {
            return food.id === data.id;
          });

          if (foundedFoodIndex > -1) {
            existedFoodIndex = foundedFoodIndex;
          }
        }

        if (existedFoodIndex < 0) {
          toastMessage = TOAST_ADD_MSG;
        } else {
          toastMessage = TOAST_EDIT_MSG;
        }
        queryClient.resetQueries({ queryKey: ['foods'] });
      }

      onCancelClick();

      setLoadingShowUp(false);

      showToast(toastMessage, ToastType.Success);

      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    onError: () => {
      onCancelClick();

      setLoadingShowUp(false);

      showToast(TOAST_ERROR_MSG, ToastType.Error);

      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    networkMode: 'always'
  });

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validateMessage = validateForm(mutationFoodData);

      if (Object.values(validateMessage).join('')) {
        setErrorMutationFoodMessage(validateMessage);
      } else {
        mutateFood(mutationFoodData);
      }
    },
    [mutateFood, mutationFoodData]
  );
  const { mutate: deleteFood } = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },
    onMutate: () => {
      setLoadingShowUp(true);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['foods'] });

      setConfirmShowUp(false);

      setLoadingShowUp(false);

      showToast(TOAST_DELETE_MSG, ToastType.Success);

      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    onError: () => {
      setConfirmShowUp(false);

      setLoadingShowUp(false);

      showToast(TOAST_ERROR_MSG, ToastType.Error);

      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
    },
    networkMode: 'always'
  });

  const onClickAddFood = useCallback(
    () => setMutationShowUp(true, DEFAULT_ADD_MODAL_TITLE, defaultData),
    [setMutationShowUp]
  );

  const onClickDeleteFood = useCallback(
    (foodId: string) =>
      setConfirmShowUp(true, DEFAULT_CONFIRM_MODAL_TITLE, foodId),
    [setConfirmShowUp]
  );

  const onClickEditFood = useCallback(
    (food: Food) => setMutationShowUp(true, DEFAULT_EDIT_MODAL_TITLE, food),
    [setMutationShowUp]
  );

  const onConfirm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      deleteFood(confirmModal.dataId);
    },
    [confirmModal.dataId, deleteFood]
  );

  const onClickExpandFood = useCallback(() => fetchNextPage(), [fetchNextPage]);

  return (
    <>
      <main className={`d-flex-col ${mainStyles['main-container']}`}>
        <div
          id="food-list"
          className={`d-flex ${mainStyles['main-content-wrapper']}`}
        >
          {isLoading && (
            <Spinner customStyle={`${mainStyles['main-loading']}`} />
          )}
          <AddCard onClick={onClickAddFood} />

          {foodData?.pages?.map((page, index) => (
            <Fragment key={index}>
              {page.data.map(food => (
                <ProductCard
                  onDeleteClick={onClickDeleteFood}
                  onEditClick={onClickEditFood}
                  product={food}
                  key={food.id}
                />
              ))}
            </Fragment>
          ))}

          {!isLoading && foodData?.pages[0].data.length === 0 && (
            <div className={`d-flex ${mainStyles['empty-message']}`}>
              {EMPTY_MSG}
            </div>
          )}
        </div>

        <Button
          isVisible={hasNextPage}
          isDisabled={isFetchingNextPage}
          onClick={onClickExpandFood}
          className={`d-flex-center ${mainStyles['expand-btn']}`}
        >
          {isFetchingNextPage ? (
            <Spinner customStyle={`${mainStyles['expand-loading']}`} />
          ) : (
            'SHOW MORE'
          )}
        </Button>
      </main>
      {confirmModal.isShowUp && (
        <Suspense fallback={<LoadingModal isVisible />}>
          <ConfirmModal
            message={confirmModal.title}
            dataId={confirmModal.dataId}
            onSubmit={onConfirm}
          />
        </Suspense>
      )}

      {mutationModal.isShowUp && (
        <Suspense fallback={<LoadingModal isVisible />}>
          <MutationModal
            title={mutationModal.title}
            productData={mutationFoodData}
            setProductData={setMutationFoodData}
            errorProductMessage={errorMutationFoodMessage}
            setErrorProductMessage={setErrorMutationFoodMessage}
            onCancelClick={onCancelClick}
            onSubmit={onSubmit}
          />
        </Suspense>
      )}
    </>
  );
};

export default MainPage;
