import { Food } from '@components/common/Cards/ProductCard';
import { FOOD_MSG, FoodErrorMessage } from '@constants/food';

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
 * @param url
 */
function isValidImageUrl(url: string): boolean {
  // Define a regular expression pattern to match valid URLs
  const pattern =
    /^https:\/\/.+(\.(jpg|jpeg|png|gif|bmp|svg|webp|avif)|q=80)$/i;

  // Use the test method of the regular expression to check if the URL matches the pattern
  return pattern.test(url);
}

export const validateForm = (inputData: Food): FoodErrorMessage => {
  const errorMessage: FoodErrorMessage = {
    name: isValidName(inputData.name) ? '' : FOOD_MSG.NAME_WARNING,
    price: isValidNumber(Number(inputData.price)) ? '' : FOOD_MSG.PRICE_WARNING,
    imageUrl: isValidImageUrl(inputData.imageUrl) ? '' : FOOD_MSG.IMG_WARNING,
    quantity: isValidInteger(Number(inputData.quantity))
      ? ''
      : FOOD_MSG.QUANTITY_WARNING
  };
  return errorMessage;
};
