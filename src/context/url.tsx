import { createContext } from 'react';

export interface UrlContextProps {
  path: string;
  setPage: (page: number) => void;
}

export const UrlContext = createContext<UrlContextProps>({
  path: '/',
  setPage(page) {
    console.log(page);
  }
});
