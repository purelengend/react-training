import {
  DEFAULT_LIMITATION,
  DEFAULT_PAGINATION,
  FILTER_ATTRIBUTE,
  SEARCH_KEYWORD
} from '../constants/filter';

export enum UrlActionKind {
  Name = 'NAME',
  Sort = 'SORT',
  Limit = 'LIMIT',
  Page = 'PAGE',
  ResetPage = 'RESET_PAGE'
}

export interface UrlAction {
  type: UrlActionKind;
  payload: string | number | boolean | undefined;
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

export const urlReducer = (state: UrlState, action: UrlAction): UrlState => {
  const { type, payload } = action;
  switch (type) {
    case UrlActionKind.Name:
      return {
        ...state,
        name: payload as string
      };
    case UrlActionKind.Sort:
      return {
        ...state,
        sort: payload as string
      };
    case UrlActionKind.Limit:
      return {
        ...state,
        limit: payload as number
      };
    case UrlActionKind.Page:
      return {
        ...state,
        page: payload as number
      };
    case UrlActionKind.ResetPage:
      return {
        ...state,
        page: initialUrlState.page
      };
    default:
      return state;
  }
};
