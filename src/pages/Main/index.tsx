import { Button } from '@components/common/Button';
import { AddCard } from '@components/common/Cards/AddCard';
import { Food, ProductCard } from '@components/common/Cards/ProductCard';
import { Fallback } from '@components/common/Fallback';
import { Spinner } from '@components/common/Spinner';
import LoadingModal from '@components/Modals/LoadingModal';
import { defaultData, FOOD_MSG } from '@constants/food';
import { MODAL_TITLE } from '@constants/modal';
import { TOAST_MSG } from '@constants/toast';
import useFood, { InfiniteQueryProps } from '@hooks/useFood';
import mainStyles from '@pages/Main/main.module.css';
import { deleteFoodById, mutationFood } from '@services/food.service';
import { useBoundStore } from '@store/index';
import { ToastType } from '@store/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FormEvent,
  Fragment,
  lazy,
  Suspense,
  useCallback,
  useEffect
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';

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

  const { showToastZustand, hideToastZustand } = useBoundStore(
    useShallow(state => ({
      showToastZustand: state.showToast,
      hideToastZustand: state.hideToast
    }))
  );

  const queryClient = useQueryClient();

  const {
    mutationModalZustand,
    setMutationShowUpZustand,
    confirmModalZustand,
    setConfirmShowUpZustand,
    setLoadingShowUpZustand
  } = useBoundStore(
    useShallow(state => ({
      mutationModalZustand: state.mutationModal,
      setMutationShowUpZustand: state.setMutationShowUp,
      setConfirmShowUpZustand: state.setConfirmShowUp,
      confirmModalZustand: state.confirmModal,
      setLoadingShowUpZustand: state.setLoadingShowUp
    }))
  );

  // react-hook-form
  const { handleSubmit, control, reset } = useForm<Food>({
    defaultValues: mutationModalZustand.productData
  });

  // Set data to the mutation form when editing a food
  useEffect(() => {
    if (mutationModalZustand.productData) {
      reset(mutationModalZustand.productData);
    }
  }, [mutationModalZustand.productData, reset]);

  const onCancelMutationClick = useCallback(() => {
    setMutationShowUpZustand(false);
    reset();
  }, [reset, setMutationShowUpZustand]);

  const { mutate: mutateFood } = useMutation({
    mutationFn: (input: Food) => {
      return mutationFood(input);
    },

    onMutate: () => {
      setLoadingShowUpZustand(true);
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

      setLoadingShowUpZustand(false);

      showToastZustand(toastMessage, ToastType.Success);

      hideToastZustand();
    },

    onError: () => {
      onCancelMutationClick();

      setLoadingShowUpZustand(false);

      showToastZustand(TOAST_MSG.ERROR, ToastType.Error);

      hideToastZustand();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
    },

    networkMode: 'always'
  });

  const onSubmit: SubmitHandler<Food> = data => {
    mutateFood(data);
  };

  const { mutate: deleteFood } = useMutation({
    mutationFn: (id: string) => {
      return deleteFoodById(id);
    },

    onMutate: () => {
      setLoadingShowUpZustand(true);
    },

    onSuccess: () => {
      setConfirmShowUpZustand(false);

      setLoadingShowUpZustand(false);

      showToastZustand(TOAST_MSG.DELETE, ToastType.Success);

      hideToastZustand();
    },

    onError: () => {
      setLoadingShowUpZustand(false);

      showToastZustand(TOAST_MSG.ERROR, ToastType.Error);

      hideToastZustand();
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
    },

    networkMode: 'always'
  });

  const onCancelConfirmClick = useCallback(() => {
    setConfirmShowUpZustand(false);
  }, [setConfirmShowUpZustand]);

  const onClickAddFood = useCallback(
    () => setMutationShowUpZustand(true, MODAL_TITLE.ADD, defaultData),
    [setMutationShowUpZustand]
  );

  const onClickDeleteFood = useCallback(
    (foodId: string) => {
      setConfirmShowUpZustand(true, MODAL_TITLE.DELETE, foodId);
    },
    [setConfirmShowUpZustand]
  );

  const onClickEditFood = useCallback(
    (food: Food) => setMutationShowUpZustand(true, MODAL_TITLE.EDIT, food),
    [setMutationShowUpZustand]
  );

  const onConfirm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      deleteFood(confirmModalZustand.dataId);
    },
    [confirmModalZustand.dataId, deleteFood]
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

      {confirmModalZustand.isShowUp && (
        <Suspense fallback={<LoadingModal />}>
          <ErrorBoundary fallback={<Fallback />}>
            <ConfirmModal
              message={confirmModalZustand.title}
              dataId={confirmModalZustand.dataId}
              onSubmit={onConfirm}
              onCancelClick={onCancelConfirmClick}
            />
          </ErrorBoundary>
        </Suspense>
      )}

      {mutationModalZustand.isShowUp && (
        <Suspense fallback={<LoadingModal />}>
          <ErrorBoundary fallback={<Fallback />}>
            <MutationModal
              title={mutationModalZustand.title}
              onCancelClick={onCancelMutationClick}
              onSubmit={handleSubmit(onSubmit)}
              control={control}
            />
          </ErrorBoundary>
        </Suspense>
      )}
    </>
  );
};

export default MainPage;
