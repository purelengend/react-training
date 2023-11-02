import { DEFAULT_PAGINATION } from '@constants/filter';
import useUrl from '@hooks/useUrl';
import { initialUrlState } from '@store/url';
import { renderHook } from '@testing-library/react';
import { act } from 'react-test-renderer';

describe('useUrl test cases', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useUrl());

    expect(result.current.currentPage).toBe(initialUrlState.page);

    expect(result.current.searchName).toBe(initialUrlState.name);

    expect(result.current.sortFilter).toBe(initialUrlState.sort);

    expect(result.current.currentLimit).toBe(initialUrlState.limit);
  });

  it('should be able to set name', () => {
    const { result } = renderHook(() => useUrl());

    const { setSearchName } = result.current;

    const mockName = 'mockName';

    act(() => {
      setSearchName(mockName);
    });

    expect(result.current.searchName).toBe(mockName);
  });

  it('should be able to set page', () => {
    const { result } = renderHook(() => useUrl());

    const { setPage } = result.current;

    const page = 3;

    act(() => {
      setPage(page);
    });

    expect(result.current.currentPage).toBe(page);
  });

  it('should be able to set sort filter', () => {
    const { result } = renderHook(() => useUrl());

    const { setSortFilter } = result.current;

    const mockSort = 'mockSortFilter=mockValue';

    act(() => {
      setSortFilter(mockSort);
    });

    expect(result.current.sortFilter).toBe(mockSort);
  });

  it('should be able to set limit', () => {
    const { result } = renderHook(() => useUrl());

    const { setLimit } = result.current;

    const limit = 5;

    act(() => {
      setLimit(limit);
    });

    expect(result.current.currentLimit).toBe(limit);
  });

  it('should be able to reset page to default value', () => {
    const { result } = renderHook(() => useUrl());

    const { resetPage } = result.current;

    act(() => {
      resetPage();
    });

    expect(result.current.currentPage).toBe(DEFAULT_PAGINATION);
  });
});
