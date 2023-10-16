import { useInfiniteQuery } from '@tanstack/react-query';
import { getFoods } from '@services/food.service';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '@constants/filter';
import { useContext } from 'react';
import { UrlContext } from '@context/url';
import { ToastContext } from '@context/toast';
import { TOAST_ERROR_MSG, TOAST_TIME } from '@constants/toast';
import { ToastType } from '@store/toast';
export interface InfiniteQueryProps<T> {
  pages: {
    data: T[];
    pageParams: number;
  }[];
  pageParams: number[];
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
      showToast(TOAST_ERROR_MSG, ToastType.Error);
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
