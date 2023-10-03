import { Food } from '../components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE } from '../constants/food';
import http from './http.service';

export const getFoods = async (path: string) => {
  const listFood = (await http.get<Food[]>(path)).data;
  return listFood;
};

export const mutationFood = async (inputFood: Food) => {
  let result: Food;
  if (inputFood.id === DEFAULT_FOOD_ID_VALUE) {
    const food: Omit<Food, 'id'> = {
      name: inputFood.name,
      price: inputFood.price,
      imageUrl: inputFood.imageUrl,
      quantity: inputFood.quantity,
      createdAt: inputFood.createdAt
    };
    result = (await http.post<Food>('', food)).data;
  } else {
    result = (await http.put<Food>('', inputFood)).data;
  }
  return result;
};
