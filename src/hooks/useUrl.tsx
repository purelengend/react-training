import { useCallback, useReducer } from 'react';
import { UrlActionKind, initialUrlState, urlReducer } from '../store/url';

const useUrl = () => {
  const [state, dispatch] = useReducer(urlReducer, initialUrlState);
  const path = `?${state.name}&${state.sort}&page=${state.page}&limit=${state.limit}`;

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
    setSearchName,
    setSortFilter,
    setPage,
    setLimit
  };
};

export default useUrl;
