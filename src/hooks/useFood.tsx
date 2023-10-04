import { useQuery } from '@tanstack/react-query';
import { getFoodById } from '../services/food.service';

const useFood = (id: string) => {
  const { data: food } = useQuery({
    queryKey: ['foods', id],
    queryFn: () => getFoodById(id)
  });

  return {
    food
  };
};

export default useFood;
