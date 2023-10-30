import useFood from '@hooks/useFood';
import * as foodService from '@services/food.service';
import { AllTheProviders } from '@src/test/test-utils';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFood', () => {
  it('should handle API request error', async () => {
    // Mock the getFoods function from the API service to throw an error
    const mockErrorGetFoods = vi.fn().mockRejectedValue('API error');
    vi.spyOn(foodService, 'getFoods').mockImplementation(mockErrorGetFoods);
    const { result } = renderHook(() => useFood(), {
      wrapper: AllTheProviders
    });

    // Simulate an API request error by providing a mock function that rejects the promise

    // Initial state
    expect(result.current.foodData).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    // Wait for the API request to complete

    // Error handling
    await waitFor(() => {
      expect(foodService.getFoods).rejects.toMatch('error');
      expect(result.current.foodData).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isRefetching).toBe(false);
    });

    // Restore the original getFoods function
    vi.restoreAllMocks();
  });
  it('should fetch and return food data', async () => {
    // Mock the getFoods function from the API service
    const mockGetFoods = vi.fn().mockResolvedValue(['foodItem1', 'foodItem2']);
    vi.spyOn(foodService, 'getFoods').mockImplementation(mockGetFoods);
    const { result } = renderHook(() => useFood(), {
      wrapper: AllTheProviders
    });

    // Initial state
    expect(result.current.foodData).toBeUndefined();
    expect(result.current.isLoading).toBe(true);

    // Wait for the API request to complete
    // Data should be loaded
    await waitFor(() => {
      expect(result.current.foodData).toEqual({
        pages: [{ data: ['foodItem1', 'foodItem2'], pageParams: 2 }],
        pageParams: [undefined]
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    // Restore the original getFoods function
    vi.restoreAllMocks();
  });
});
