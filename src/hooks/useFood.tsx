import { useInfiniteQuery } from '@tanstack/react-query';
import { getFoods } from '@services/food.service';
import { DEFAULT_LIMITATION, DEFAULT_PAGINATION } from '@constants/filter';
import { useContext } from 'react';
import { UrlContext } from '@context/url';
export interface InfiniteQueryProps<T> {
  pages: {
    data: T[];
    pageParams: number;
  }[];
  pageParams: number[];
}
const useFood = () => {
  const { path } = useContext(UrlContext);
  const getMoreFoods = async (pageParams: number) => {
    console.log(path);
    const result = await getFoods(path + `${pageParams}`);
    return { data: [...result], pageParams: pageParams + 1 };
  };

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['foods'],
      queryFn: ({ pageParam = DEFAULT_PAGINATION }) => getMoreFoods(pageParam),
      getNextPageParam: lastPages => {
        if (lastPages.data.length < DEFAULT_LIMITATION) return undefined;
        return lastPages.pageParams;
      },
      refetchOnWindowFocus: false
    });

  return {
    foodData: data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    refetch
  };
};

export default useFood;
