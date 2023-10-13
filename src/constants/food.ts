import { Food } from '@components/common/Cards/ProductCard';

export const FOOD_NAME_WARNING_MSG =
  'The food name cannot be empty or have two trailing spaces consecutive.';
export const FOOD_PRICE_WARNING_MSG =
  'The food price cannot be empty and greater than 0';
export const FOOD_IMG_WARNING_MSG =
  'The food image URL cannot be empty and must be in the right format';
export const FOOD_QUANTITY_WARNING_MSG =
  'The food quantity cannot be empty and must be an integer that greater than 0';
export const EMPTY_MSG =
  'Oops! It looks like there are no food items available at the moment.';
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
