import { AxiosError, AxiosResponse } from 'axios';
import { onFulfilled, onRejected } from '../http.service';

describe('HTTP Response Interceptors', () => {
  it('should handle onFulfilled function', () => {
    // Create a mock AxiosResponse
    const mockResponse = {
      data: {
        id: 1,
        name: 'John Doe'
      }
    };

    // Call the onFulfilled function
    const result = onFulfilled(mockResponse as AxiosResponse);

    // Assert that the function returns the response as-is
    expect(result).toEqual(mockResponse);
  });

  it('should handle onRejected function with a response', () => {
    // Create a mock AxiosError with a response
    const errorResponse = {
      response: { status: 404 }
    };

    // Capture console.error output
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Call the onRejected function
    const promise = onRejected(errorResponse as AxiosError);

    // Assert that the function returns a rejected promise
    promise.catch(error => {
      expect(error).toBe(errorResponse);

      // Verify that console.error was called with the expected message
      expect(consoleError).toHaveBeenCalledWith(
        'Looks like there was a problem. Status Code: 404'
      );
    });
  });

  it('should handle onRejected function without a response', () => {
    // Create a mock AxiosError without a response
    const errorResponse = { message: 'Network Error' };

    // Capture console.error output
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Call the onRejected function
    const promise = onRejected(errorResponse as AxiosError);

    // Assert that the function returns a rejected promise
    promise.catch(error => {
      expect(error).toBe(errorResponse);

      // Verify that console.error was not called
      expect(consoleError).not.toHaveBeenCalled();
    });
  });
});
