import { TOAST_TIME } from '@constants/toast';
import useToast from '@hooks/useToast';
import { initialToastState, ToastType } from '@store/toast';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';

describe('useToast test cases', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useToast());

    expect(result.current.toast).toStrictEqual(initialToastState);
  });

  it('should show toast and hide toast properly', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    const { result } = renderHook(() => useToast());
    const { showToast, hideToast } = result.current;

    const mockToast = {
      message: 'Mock Title',
      toastType: ToastType.Success,
      isVisible: true
    };

    act(() => {
      showToast(mockToast.message, mockToast.toastType);
    });

    await waitFor(() => {
      expect(result.current.toast.isVisible).toBe(mockToast.isVisible);
      expect(result.current.toast.message).toBe(mockToast.message);
      expect(result.current.toast.toastType).toBe(mockToast.toastType);
    });

    act(() => {
      hideToast();
      vi.advanceTimersByTime(TOAST_TIME);
    });

    expect(result.current.toast.isVisible).toBe(false);
  });
});
