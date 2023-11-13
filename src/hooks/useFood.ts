import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '@constants/filter';
import { TOAST_MSG } from '@constants/toast';
import { ToastContext } from '@context/toast';
import { getFoods } from '@services/food.service';
import { useBoundStore } from '@store/index';
import { ToastType } from '@store/toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

export interface InfiniteQueryProps<T> {
  pages: Array<{
    data: Array<T>;
    pageParams: number;
  }>;
  pageParams: Array<number>;
}

const useFood = () => {
  const { pathZustand } = useBoundStore(
    useShallow(state => ({
      pathZustand: state.getPath()
    }))
  );

  const { showToast, hideToast } = useContext(ToastContext);

  const getMoreFoods = async (pageParams: number) => {
    const result = await getFoods(pathZustand + `${pageParams}`);

    return { data: [...result], pageParams: pageParams + 1 };
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ['foods'],

    queryFn: ({ pageParam = DEFAULT_PAGINATION }) => getMoreFoods(pageParam),

    getNextPageParam: lastPages => {
      if (lastPages.data.length < DEFAULT_LIMITATION) return undefined;

      return lastPages.pageParams;
    },

    refetchOnWindowFocus: false,

    onError: () => {
      showToast(TOAST_MSG.ERROR, ToastType.Error);

      hideToast();
    }
  });

  return {
    foodData: data,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    refetch
  };
};

export default useFood;
