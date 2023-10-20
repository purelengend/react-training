import { Food } from '@components/common/Cards/ProductCard';
import { DEFAULT_FOOD_ID_VALUE } from '@constants/food';
import http from '@services/http.service';

export const getFoods = async (path: string) => {
  const listFood = (await http.get<Array<Food>>(path)).data;

  return listFood;
};

export const getFoodById = async (id: string) => {
  const food = (await http.get<Array<Food>>(id)).data;

  return food;
};

export const deleteFoodById = async (id: string) => {
  const food = (await http.delete<Food>(id)).data;

  return food;
};

export const mutationFood = async (inputFood: Food) => {
  let result: Food;

  if (inputFood.id === DEFAULT_FOOD_ID_VALUE) {
    const food: Omit<Food, 'id'> = {
      name: inputFood.name,
      price: Number(inputFood.price),
      imageUrl: inputFood.imageUrl,
      quantity: Number(inputFood.quantity),
      createdAt: new Date()
    };

    result = (await http.post<Food>('', food)).data;
  } else {
    const food: Food = {
      id: inputFood.id,
      name: inputFood.name,
      price: Number(inputFood.price),
      imageUrl: inputFood.imageUrl,
      quantity: Number(inputFood.quantity),
      createdAt: inputFood.createdAt
    };

    result = (await http.put<Food>(`${inputFood.id}`, food)).data;
  }

  return result;
};
