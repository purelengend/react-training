import {
  getFoods,
  getFoodById,
  deleteFoodById,
  mutationFood
} from '@services/food.service';
import http from '@services/http.service';
import { Food } from '@components/common/Cards/ProductCard';
import { Mocked } from 'vitest';

// Mock the http service
vi.mock('@services/http.service');

const mockedHttp = http as Mocked<typeof http>;

describe('Food Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get a list of foods', async () => {
    const mockData: Food[] = [
      {
        id: '1',
        name: 'Food 1',
        imageUrl: 'mocked',
        price: 123,
        quantity: 321,
        createdAt: new Date(1)
      },
      {
        id: '2',
        name: 'Food 2',
        imageUrl: 'mocked',
        price: 123,
        quantity: 321,
        createdAt: new Date(1)
      }
    ];

    mockedHttp.get.mockResolvedValue({ data: mockData });

    const result = await getFoods('/food-list');

    expect(result).toEqual(mockData);
  });

  it('should get a food by ID', async () => {
    const mockFood: Food = {
      id: '1',
      name: 'Food 1',
      imageUrl: 'mocked',
      price: 123,
      quantity: 321,
      createdAt: new Date(1)
    };

    mockedHttp.get.mockResolvedValue({ data: mockFood });

    const result = await getFoodById('1');

    expect(result).toEqual(mockFood);
  });

  it('should delete a food by ID', async () => {
    const mockFood: Food = {
      id: '2',
      name: 'Food 2',
      imageUrl: 'mocked',
      price: 123,
      quantity: 321,
      createdAt: new Date(1)
    };

    mockedHttp.delete.mockResolvedValue({ data: mockFood });

    const result = await deleteFoodById('2');

    expect(result).toEqual(mockFood);
  });

  it('should create a food', async () => {
    const mockInputFood: Food = {
      id: '',
      name: 'Added Food 3',
      imageUrl: 'mocked',
      price: 123,
      quantity: 321,
      createdAt: new Date(1)
    };

    mockedHttp.post.mockResolvedValue({ data: mockInputFood });

    const result = await mutationFood(mockInputFood);

    expect(result).toEqual(mockInputFood);
  });

  it('should update a food', async () => {
    const mockInputFood: Food = {
      id: '1',
      name: 'Updated Food 1',
      imageUrl: 'mocked',
      price: 123,
      quantity: 321,
      createdAt: new Date(1)
    };

    mockedHttp.put.mockResolvedValue({ data: mockInputFood });

    const result = await mutationFood(mockInputFood);

    expect(result).toEqual(mockInputFood);
  });
});
