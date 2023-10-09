import { DEFAULT_FILTER_ATTRIBUTE } from '@constants/filter';
import { createContext } from 'react';

export interface UrlContextProps {
  path: string;
  setPage: (page: number) => void;
  sortFilter: string;
  setSortFilter: (filter: string) => void;
  resetPage: () => void;
}

export const UrlContext = createContext<UrlContextProps>({
  path: '/',
  setPage(page) {
    console.log(page);
  },
  sortFilter: DEFAULT_FILTER_ATTRIBUTE,
  setSortFilter(filter) {
    console.log(filter);
  },
  resetPage() {}
});
