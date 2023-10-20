import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '@constants/filter';
import { TOAST_MSG, TOAST_TIME } from '@constants/toast';
import { ToastContext } from '@context/toast';
import { UrlContext } from '@context/url';
import { getFoods } from '@services/food.service';
import { ToastType } from '@store/toast';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export interface InfiniteQueryProps<T> {
  pages: Array<{
    data: Array<T>;
    pageParams: number;
  }>;
  pageParams: Array<number>;
}

const useFood = () => {
  const { path } = useContext(UrlContext);

  const { showToast, hideToast } = useContext(ToastContext);

  const getMoreFoods = async (pageParams: number) => {
    const result = await getFoods(path + `${pageParams ?? DEFAULT_PAGINATION}`);

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

      setTimeout(() => {
        hideToast();
      }, TOAST_TIME);
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
