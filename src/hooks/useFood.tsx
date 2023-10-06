import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getFoods } from '../services/food.service';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '../constants/filter';
import { useContext } from 'react';
import { UrlContext } from '../context/url';
import { Food } from '../components/common/Cards/ProductCard';
export interface InfiniteQueryProps<T> {
  pages: {
    data: T[];
    pageParams: number;
  }[];
  pageParams: number[];
}
const useFood = () => {
  const { path } = useContext(UrlContext);

  const queryClient = useQueryClient();

  const getMoreFoods = async (pageParams: number) => {
    const result = await getFoods(path + `${pageParams}`);
    return { data: [...result], pageParams: pageParams + 1 };
  };

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['foods'],
    queryFn: ({ pageParam = DEFAULT_PAGINATION }) => getMoreFoods(pageParam),
    getNextPageParam: lastPages => {
      if (lastPages.data.length < DEFAULT_LIMITATION) return undefined;
      return lastPages.pageParams;
    },
    initialData: () => {
      const queryData = queryClient.getQueryData<InfiniteQueryProps<Food>>([
        'foods'
      ]);
      return queryData;
    },
    refetchOnWindowFocus: false
  });

  return {
    foodData: data,
    isLoading,
    fetchNextPage,
    hasNextPage
  };
};

export default useFood;
