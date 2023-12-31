import { initialUrlState, UrlActionKind, urlReducer } from '@store/url';
import { useCallback, useMemo, useReducer } from 'react';

const useUrl = () => {
  const [state, dispatch] = useReducer(urlReducer, initialUrlState);

  const path = useMemo(
    () => `?name=${state.name}&${state.sort}&limit=${state.limit}&page=`,
    [state.limit, state.name, state.sort]
  );

  const setSearchName = useCallback(
    (searchName: string) => {
      dispatch({
        type: UrlActionKind.Name,
        payload: searchName
      });
    },
    [dispatch]
  );

  const setSortFilter = useCallback(
    (sortFilter: string) => {
      dispatch({
        type: UrlActionKind.Sort,
        payload: sortFilter
      });
    },
    [dispatch]
  );

  const setPage = useCallback(
    (page: number) => {
      dispatch({
        type: UrlActionKind.Page,
        payload: page
      });
    },
    [dispatch]
  );

  const resetPage = useCallback(() => {
    dispatch({
      type: UrlActionKind.ResetPage,
      payload: undefined
    });
  }, [dispatch]);

  const setLimit = useCallback(
    (limit: number) => {
      dispatch({
        type: UrlActionKind.Limit,
        payload: limit
      });
    },
    [dispatch]
  );

  return {
    path,
    currentPage: state.page,
    searchName: state.name,
    setSearchName,
    sortFilter: state.sort,
    currentLimit: state.limit,
    setSortFilter,
    setPage,
    resetPage,
    setLimit
  };
};

export default useUrl;
