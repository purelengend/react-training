import {
  DEFAULT_LIMITATION,
  DEFAULT_PAGINATION,
  FILTER_ATTRIBUTE,
  SEARCH_KEYWORD
} from '@constants/filter';

import { MiddlewareStateCreator } from './type';

export type UrlSlice = {
  name: string;
  sort: string;
  limit: number;
  page: number;
  setPage: (page: number) => void;
  resetPage: () => void;
  setSortFilter: (filter: string) => void;
  setSearchName: (name: string) => void;
  getPath: () => string;
};

export const initialUrlSlice: UrlSlice = {
  name: SEARCH_KEYWORD,
  sort: FILTER_ATTRIBUTE.DEFAULT,
  limit: DEFAULT_LIMITATION,
  page: DEFAULT_PAGINATION,
  setPage: () => {},
  resetPage: () => {},
  setSortFilter: () => {},
  setSearchName: () => {},
  getPath: () =>
    `?name=${SEARCH_KEYWORD}&${FILTER_ATTRIBUTE.DEFAULT}&limit=${DEFAULT_LIMITATION}&page=`
};

export const createUrlSlice: MiddlewareStateCreator<UrlSlice> = (set, get) => ({
  ...initialUrlSlice,

  setPage: page => {
    set(state => {
      state.page = page;
    });
  },

  resetPage: () => {
    set(state => {
      state.page = initialUrlSlice.page;
    });
  },

  setSearchName: name => {
    set(state => {
      state.name = name;
    });
  },

  setSortFilter: filter => {
    set(state => {
      state.sort = filter;
    });
  },

  getPath: () => `?name=${get().name}&${get().sort}&limit=${get().limit}&page=`
});
