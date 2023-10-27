import { Button } from '@components/common/Button';
import { AddCard } from '@components/common/Cards/AddCard';
import { Food, ProductCard } from '@components/common/Cards/ProductCard';
import { Fallback } from '@components/common/Fallback';
import { Spinner } from '@components/common/Spinner';
import LoadingModal from '@components/Modals/LoadingModal';
import {
  defaultData,
  defaultFoodErrorMessage,
  FOOD_MSG
} from '@constants/food';
import { MODAL_TITLE } from '@constants/modal';
import { TOAST_MSG } from '@constants/toast';
import { ModalContext } from '@context/modal';
import { ToastContext } from '@context/toast';
import { validateForm } from '@helpers/form-validation';
import useFood, { InfiniteQueryProps } from '@hooks/useFood';
import mainStyles from '@pages/Main/main.module.css';
import { deleteFoodById, mutationFood } from '@services/food.service';
import { ToastType } from '@store/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FormEvent,
  Fragment,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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

  // Set data to the mutation form when editing a food
  useEffect(() => {
    if (mutationModal.productData) {
      setMutationFoodData(mutationModal.productData);
    }
  }, [mutationModal.productData]);

  const onCancelMutationClick = useCallback(() => {
    if (mutationFoodData.id === defaultData.id) {
      setMutationFoodData(defaultData);
    } else {
      setMutationFoodData(mutationModal.productData!);
    }

    setErrorMutationFoodMessage(defaultFoodErrorMessage);

    setMutationShowUp(false);
  }, [mutationFoodData.id, mutationModal.productData, setMutationShowUp]);

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
          toastMessage = TOAST_MSG.ADD;
        } else {
          toastMessage = TOAST_MSG.EDIT;
        }
      }

      onCancelMutationClick();

      setLoadingShowUp(false);

      showToast(toastMessage, ToastType.Success);

      hideToast();
    },

    onError: () => {
      onCancelMutationClick();

      setLoadingShowUp(false);

      showToast(TOAST_MSG.ERROR, ToastType.Error);

      hideToast();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
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
      setConfirmShowUp(false);

      setLoadingShowUp(false);

      showToast(TOAST_MSG.DELETE, ToastType.Success);

      hideToast();
    },

    onError: () => {
      setConfirmShowUp(false);

      setLoadingShowUp(false);

      showToast(TOAST_MSG.ERROR, ToastType.Error);

      hideToast();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
    },

    networkMode: 'always'
  });

  const onCancelConfirmClick = useCallback(
    () => setConfirmShowUp(false),
    [setConfirmShowUp]
  );

  const onClickAddFood = useCallback(
    () => setMutationShowUp(true, MODAL_TITLE.ADD, defaultData),
    [setMutationShowUp]
  );

  const onClickDeleteFood = useCallback(
    (foodId: string) => setConfirmShowUp(true, MODAL_TITLE.DELETE, foodId),
    [setConfirmShowUp]
  );

  const onClickEditFood = useCallback(
    (food: Food) => setMutationShowUp(true, MODAL_TITLE.EDIT, food),
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

          <ErrorBoundary fallback={<Fallback />}>
            <AddCard onClick={onClickAddFood} />
          </ErrorBoundary>

          {foodData?.pages?.map((page, index) => (
            <Fragment key={index}>
              {page.data.map(food => (
                <ErrorBoundary key={index + food.id} fallback={<Fallback />}>
                  <ProductCard
                    onDeleteClick={onClickDeleteFood}
                    onEditClick={onClickEditFood}
                    product={food}
                    key={food.id}
                  />
                </ErrorBoundary>
              ))}
            </Fragment>
          ))}

          {!isLoading && foodData?.pages[0].data.length === 0 && (
            <div className={`d-flex ${mainStyles['empty-message']}`}>
              {FOOD_MSG.EMPTY}
            </div>
          )}
        </div>

        <ErrorBoundary fallback={<Fallback />}>
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
        </ErrorBoundary>
      </main>

      {confirmModal.isShowUp && (
        <Suspense fallback={<LoadingModal />}>
          <ErrorBoundary fallback={<Fallback />}>
            <ConfirmModal
              message={confirmModal.title}
              dataId={confirmModal.dataId}
              onSubmit={onConfirm}
              onCancelClick={onCancelConfirmClick}
            />
          </ErrorBoundary>
        </Suspense>
      )}

      {mutationModal.isShowUp && (
        <Suspense fallback={<LoadingModal />}>
          <ErrorBoundary fallback={<Fallback />}>
            <MutationModal
              title={mutationModal.title}
              productData={mutationFoodData}
              setProductData={setMutationFoodData}
              errorProductMessage={errorMutationFoodMessage}
              setErrorProductMessage={setErrorMutationFoodMessage}
              onCancelClick={onCancelMutationClick}
              onSubmit={onSubmit}
            />
          </ErrorBoundary>
        </Suspense>
      )}
    </>
  );
};

export default MainPage;
