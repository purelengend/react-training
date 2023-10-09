import { FoodErrorMessage } from '@components/Modals/MutationModal';
import { Food } from '@components/common/Cards/ProductCard';
import {
  FOOD_IMG_WARNING_MSG,
  FOOD_NAME_WARNING_MSG,
  FOOD_PRICE_WARNING_MSG,
  FOOD_QUANTITY_WARNING_MSG
} from '@constants/food';

/**
 * @function isValidName
 *
 * Check if the input string contains two trailing spaces consecutive or trailing spaces at the begin/end of the name.
 *
 * @param input
 */
function isValidName(input: string): boolean {
  return input.length !== 0 && !/^\s| {2,}|\s$/.test(input);
}

/**
 * @function isValidNumber
 *
 * Check if the input number is greater than 0.
 *
 * @param input
 */
function isValidNumber(input: number): boolean {
  return input > 0;
}

/**
 * @function isValidInteger
 *
 * Check if the input number is an integer and greater than 0.
 *
 * @param input
 */
function isValidInteger(input: number): boolean {
  return Number.isInteger(input) && input > 0;
}

/**
 * @function isValidImageUrl
 *
 * Check if the input image url is a valid URL with supported format extensions: 'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'q=80'.
 *
 * @param input
 */
function isValidImageUrl(url: string): boolean {
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'svg',
    'webp',
    'avif',
    'q=80'
  ];

  const urlLower = url.toLowerCase();
  return imageExtensions.some(
    extension =>
      urlLower.endsWith('.' + extension) || urlLower.endsWith('&' + extension)
  );
}

export const validateForm = (inputData: Food): FoodErrorMessage => {
  const errorMessage: FoodErrorMessage = {
    name: isValidName(inputData.name) ? '' : FOOD_NAME_WARNING_MSG,
    price: isValidNumber(inputData.price) ? '' : FOOD_PRICE_WARNING_MSG,
    imageUrl: isValidImageUrl(inputData.imageUrl) ? '' : FOOD_IMG_WARNING_MSG,
    quantity: isValidInteger(inputData.quantity)
      ? ''
      : FOOD_QUANTITY_WARNING_MSG
  };
  return errorMessage;
};
