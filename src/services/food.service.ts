import { Food } from '../components/common/Cards/ProductCard';
import http from './http.service';

export const getFoods = async (path: string) => {
  const listFood = (await http.get<Food[]>(path)).data;
  return listFood;
};
