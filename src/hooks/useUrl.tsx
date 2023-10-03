import { useReducer } from 'react';
import { UrlActionKind, initialUrlState, urlReducer } from '../store/url';

const useUrl = () => {
  const [state, dispatch] = useReducer(urlReducer, initialUrlState);
  const path = `?${state.name}&${state.sort}&page=${state.page}&limit=${state.limit}`;

  const setSearchName = (searchName: string) => {
    dispatch({
      type: UrlActionKind.Name,
      payload: searchName
    });
  };

  const setSortFilter = (sortFilter: string) => {
    dispatch({
      type: UrlActionKind.Sort,
      payload: sortFilter
    });
  };

  const setPage = (page: number) => {
    dispatch({
      type: UrlActionKind.Page,
      payload: page
    });
  };

  const setLimit = (limit: number) => {
    dispatch({
      type: UrlActionKind.Limit,
      payload: limit
    });
  };
  return {
    path,
    setSearchName,
    setSortFilter,
    setPage,
    setLimit
  };
};

export default useUrl;
