import { DEFAULT_FILTER_ATTRIBUTE } from '@constants/filter';
import { createContext } from 'react';

export interface UrlContextProps {
  path: string;
  setPage: (page: number) => void;
  resetPage: () => void;
  sortFilter: string;
  setSortFilter: (filter: string) => void;
  searchName: string;
  setSearchName: (name: string) => void;
}

export const UrlContext = createContext<UrlContextProps>({
  path: '/',
  setPage(page) {
    console.log(page);
  },
  resetPage() {},
  sortFilter: DEFAULT_FILTER_ATTRIBUTE,
  setSortFilter(filter) {
    console.log(filter);
  },
  searchName: '',
  setSearchName(name) {
    console.log(name);
  }
});
