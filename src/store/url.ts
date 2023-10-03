import {
  DEFAULT_LIMITATION,
  DEFAULT_PAGINATION,
  FILTER_ATTRIBUTE,
  SEARCH_KEYWORD
} from '../constants/filter';

export enum ActionKind {
  Name = 'NAME',
  Sort = 'SORT',
  Limit = 'LIMIT',
  Page = 'PAGE'
}

export interface Action {
  type: ActionKind;
  payload: string | number | boolean;
}

export interface InitState {
  name: string;
  sort: string;
  limit: number;
  page: number;
}
export const initialState: InitState = {
  name: SEARCH_KEYWORD,
  sort: FILTER_ATTRIBUTE,
  limit: DEFAULT_LIMITATION,
  page: DEFAULT_PAGINATION
};

export const urlReducer = (state: InitState, action: Action): InitState => {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.Name:
      return {
        ...state,
        name: payload as string
      };
    case ActionKind.Sort:
      return {
        ...state,
        sort: payload as string
      };
    case ActionKind.Limit:
      return {
        ...state,
        limit: payload as number
      };
    case ActionKind.Page:
      return {
        ...state,
        page: payload as number
      };
    default:
      return state;
  }
};
