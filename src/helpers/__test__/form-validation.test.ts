import { Food } from '@components/common/Cards/ProductCard';
import {
  defaultFoodErrorMessage,
  FOOD_MSG,
  FoodErrorMessage
} from '@constants/food';
import {
  isValidImageUrl,
  isValidInteger,
  isValidName,
  isValidNumber,
  validateForm
} from '@helpers/form-validation';

describe('Validation Functions test cases', () => {
  it('isValidName returns true for a valid name', () => {
    expect(isValidName('John Doe')).toBe(true);
  });

  it('isValidName returns false for a name with consecutive spaces', () => {
    expect(isValidName('John  Doe')).toBe(false);
  });

  it('isValidName returns false for a name with trailing spaces', () => {
    expect(isValidName(' John Doe ')).toBe(false);
  });

  it('isValidNumber returns true for a valid positive number', () => {
    expect(isValidNumber(5)).toBe(true);
  });

  it('isValidNumber returns false for zero', () => {
    expect(isValidNumber(0)).toBe(false);
  });

  it('isValidInteger returns true for a valid positive integer', () => {
    expect(isValidInteger(5)).toBe(true);
  });

  it('isValidInteger returns false for a non-integer number', () => {
    expect(isValidInteger(5.5)).toBe(false);
  });

  test('isValidImageUrl returns true for a valid image URL', () => {
    const validImageUrl = 'https://example.com/image.jpg';
    expect(isValidImageUrl(validImageUrl)).toBe(true);
  });

  test('isValidImageUrl returns false for an invalid image URL', () => {
    const invalidImageUrl = 'https://example.com/document.pdf';
    expect(isValidImageUrl(invalidImageUrl)).toBe(false);
  });
});

describe('validateForm Function', () => {
  it('validateForm returns an empty error message for valid input', () => {
    const validInputData: Food = {
      id: '0',
      name: 'Burger',
      price: 10,
      imageUrl: 'https://example.com/burger.jpg',
      quantity: 3
    };

    const result = validateForm(validInputData);

    expect(result).toEqual(defaultFoodErrorMessage);
  });

  it('validateForm returns error messages for invalid input', () => {
    const invalidInputData: Food = {
      id: '0',
      name: '  Invalid Name  ',
      price: 0,
      imageUrl: 'https://example.com/document.pdf',
      quantity: 2.5
    };

    const result = validateForm(invalidInputData);

    const expectedErrorMessage: FoodErrorMessage = {
      name: FOOD_MSG.NAME_WARNING,
      price: FOOD_MSG.PRICE_WARNING,
      imageUrl: FOOD_MSG.IMG_WARNING,
      quantity: FOOD_MSG.QUANTITY_WARNING
    };

    expect(result).toEqual(expectedErrorMessage);
  });
});
