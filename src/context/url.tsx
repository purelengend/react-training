import { FILTER_ATTRIBUTE } from '@constants/filter';
import useUrl from '@hooks/useUrl';
import { createContext, memo, ReactNode, useMemo } from 'react';
import isEqual from 'react-fast-compare';

interface UrlContextProps {
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
  setPage() {},
  resetPage() {},
  sortFilter: FILTER_ATTRIBUTE.DEFAULT,
  setSortFilter() {},
  searchName: '',
  setSearchName() {}
});

interface UrlContextProviderProps {
  children: ReactNode;
}

export const UrlContextProvider = memo(
  ({ children }: UrlContextProviderProps) => {
    const {
      path,
      setPage,
      resetPage,
      sortFilter,
      setSortFilter,
      searchName,
      setSearchName
    } = useUrl();

    const urlContextValue = useMemo(
      () => ({
        path,
        setPage,
        resetPage,
        sortFilter,
        setSortFilter,
        searchName,
        setSearchName
      }),
      [
        path,
        setPage,
        resetPage,
        sortFilter,
        setSortFilter,
        searchName,
        setSearchName
      ]
    );

    return (
      <UrlContext.Provider value={urlContextValue}>
        {children}
      </UrlContext.Provider>
    );
  },
  isEqual
);

UrlContextProvider.whyDidYouRender = true;
