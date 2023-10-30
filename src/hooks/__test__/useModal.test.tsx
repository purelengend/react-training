import { defaultData } from '@constants/food';
import useModal from '@hooks/useModal';
import { initialModalState } from '@store/modal';
import { renderHook } from '@testing-library/react';
import { act } from 'react-test-renderer';

describe('useModal', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.confirmModal).toBe(initialModalState.confirmModal);
    expect(result.current.mutationModal).toBe(initialModalState.mutationModal);
    expect(result.current.isLoadingShowUp).toBe(false);
  });

  it('should set confirmModal', () => {
    const { result } = renderHook(() => useModal());
    const { setConfirmShowUp } = result.current;

    const mockConfirm: typeof result.current.confirmModal = {
      dataId: '123',
      title: 'Mock Title',
      isShowUp: true
    };

    act(() => {
      setConfirmShowUp(
        mockConfirm.isShowUp,
        mockConfirm.title,
        mockConfirm.dataId
      );
    });

    expect(result.current.confirmModal).toStrictEqual(mockConfirm);
  });

  it('should set mutationModal', () => {
    const { result } = renderHook(() => useModal());
    const { setMutationShowUp } = result.current;

    const mockMutation: typeof result.current.mutationModal = {
      productData: defaultData,
      title: 'Mock Title',
      isShowUp: true
    };

    act(() => {
      setMutationShowUp(
        mockMutation.isShowUp,
        mockMutation.title,
        mockMutation.productData
      );
    });

    expect(result.current.mutationModal).toStrictEqual(mockMutation);
  });

  it('should set isLoadingShowUp', () => {
    const { result } = renderHook(() => useModal());
    const { setLoadingShowUp } = result.current;

    act(() => {
      setLoadingShowUp(true);
    });

    expect(result.current.isLoadingShowUp).toBe(true);
  });
});
