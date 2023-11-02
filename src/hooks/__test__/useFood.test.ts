import useFood from '@hooks/useFood';
import * as foodService from '@services/food.service';
import { AllTheProviders } from '@src/test/test-utils';
import { useQueryClient } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFood test cases', () => {
  it('should fetch and return food data', async () => {
    // Mock the getFoods function from the API service
    const mockGetFoods = vi
      .fn()
      .mockResolvedValue(Array(9).fill('mocked food'));

    vi.spyOn(foodService, 'getFoods').mockImplementation(mockGetFoods);

    const { result } = renderHook(() => useFood(), {
      wrapper: AllTheProviders
    });

    const {
      result: { current: query }
    } = renderHook(() => useQueryClient(), {
      wrapper: AllTheProviders
    });

    // Initial state
    expect(result.current.foodData).toBeUndefined();

    expect(result.current.isLoading).toBe(true);

    // Wait for the API request to complete
    await waitFor(() => {
      // Data should be loaded
      expect(result.current.foodData).toEqual({
        pages: [{ data: Array(9).fill('mocked food'), pageParams: 2 }],
        pageParams: [undefined]
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Restore the original getFoods function
    vi.restoreAllMocks();

    // Clear query cache
    query.removeQueries(['foods']);
  });

  it('should implement hasNextPage', async () => {
    // Mock the getFoods function from the API service
    const mockGetFoods = vi.fn().mockResolvedValue([undefined]);

    vi.spyOn(foodService, 'getFoods').mockImplementation(mockGetFoods);

    const { result } = renderHook(() => useFood(), {
      wrapper: AllTheProviders
    });

    const {
      result: { current: query }
    } = renderHook(() => useQueryClient(), {
      wrapper: AllTheProviders
    });

    // Initial state
    expect(result.current.foodData).toBeUndefined();

    expect(result.current.isLoading).toBe(true);

    // Wait for the API request to complete
    await waitFor(() => {
      // Data should be loaded
      expect(result.current.hasNextPage).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Restore the original getFoods function
    vi.restoreAllMocks();

    // Clear query cache
    query.removeQueries(['foods']);
  });

  it('should handle API request error', async () => {
    // Mock the getFoods function from the API service to throw an error
    const mockErrorGetFoods = vi.fn().mockRejectedValue('API error');

    vi.spyOn(foodService, 'getFoods').mockImplementation(mockErrorGetFoods);

    const { result } = renderHook(() => useFood(), {
      wrapper: AllTheProviders
    });

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
});
