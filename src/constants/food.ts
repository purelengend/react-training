import { Food } from '@components/common/Cards/ProductCard';

export const FOOD_MSG = {
  NAME_WARNING:
    'The food name cannot be empty or have two trailing spaces consecutive',
  PRICE_WARNING:
    'The price cannot be empty or have two trailing spaces consecutive',
  IMG_WARNING:
    'The food image URL cannot be empty and must be in the right format',
  QUANTITY_WARNING:
    'The food quantity cannot be empty and must be an integer that greater than 0',
  EMPTY: 'Oops! It looks like there are no food items available at the moment.'
} as const;

export const DEFAULT_FOOD_ID_VALUE = '';

export const defaultData: Food = {
  id: '',
  name: '',
  price: 0,
  imageUrl: '',
  quantity: 0,
  createdAt: new Date()
};

export interface FoodErrorMessage {
  name: string;
  price: string;
  imageUrl: string;
  quantity: string;
}

export const defaultFoodErrorMessage: FoodErrorMessage = {
  name: '',
  price: '',
  imageUrl: '',
  quantity: ''
};
