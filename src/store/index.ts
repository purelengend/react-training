import {
  DEFAULT_LIMITATION,
  DEFAULT_PAGINATION,
  FILTER_ATTRIBUTE,
  SEARCH_KEYWORD
} from '../constants/filter';

export enum UrlActionKind {
  NAME = 'NAME',
  SORT = 'SORT',
  LIMIT = 'LIMIT',
  PAGE = 'PAGE'
}

export interface UrlAction {
  type: UrlActionKind;
  payload: string | number;
}

export interface UrlState {
  name: string;
  sort: string;
  limit: number;
  page: number;
}
export const initialUrlState: UrlState = {
  name: SEARCH_KEYWORD,
  sort: FILTER_ATTRIBUTE,
  limit: DEFAULT_LIMITATION,
  page: DEFAULT_PAGINATION
};

export const urlReducer = (state: UrlState, action: UrlAction) => {
  const { type, payload } = action;
  switch (type) {
    case UrlActionKind.NAME:
      return {
        ...state,
        name: payload
      };
    case UrlActionKind.SORT:
      return {
        ...state,
        sort: payload
      };
    case UrlActionKind.LIMIT:
      return {
        ...state,
        limit: payload
      };
    case UrlActionKind.PAGE:
      return {
        ...state,
        page: payload
      };
    default:
      break;
  }
};
