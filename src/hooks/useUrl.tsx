import { useReducer } from 'react';
import { ActionKind, initialState, urlReducer } from '../store/url';

const useUrl = () => {
  const [state, dispatch] = useReducer(urlReducer, initialState);
  const path = `?${state.name}&${state.sort}&page=${state.page}&limit=${state.limit}`;

  const setSearchName = (searchName: string) => {
    dispatch({
      type: ActionKind.Name,
      payload: searchName
    });
  };

  const setSortFilter = (sortFilter: string) => {
    dispatch({
      type: ActionKind.Sort,
      payload: sortFilter
    });
  };

  const setPage = (page: number) => {
    dispatch({
      type: ActionKind.Page,
      payload: page
    });
  };

  const setLimit = (limit: number) => {
    dispatch({
      type: ActionKind.Limit,
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
