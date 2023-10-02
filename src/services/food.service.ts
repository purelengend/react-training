import { Food } from '../components/common/Cards/ProductCard';
import { request } from './common.service';

export const getAllFoods = async () => await request<Food[]>('GET', '/');
