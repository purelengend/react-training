import Header from '@src/components/Header';
import { render } from '@src/test/test-utils';
import { createEvent, fireEvent, screen } from '@testing-library/react';

it('should prevent default submit behavior', async () => {
  render(<Header />);

  const header = screen.getByRole('form', { name: 'search-form' });

  const submitEvent = createEvent.submit(header);

  await fireEvent(header, submitEvent);

  expect(submitEvent.defaultPrevented).toBe(true);
});

// it('should make request after one second', async () => {
//   const mockFunction = vi.fn();

//   render(<Header />);

//   vi.spyOn(useFood, 'useFood').mockImplementation(mockFunction);

//   const searchInput = screen.getByRole('textbox', {
//     name: /search icon/i
//   });

//   userEvent.type(searchInput, 'mocked');

//   expect(mockFunction).not.toHaveBeenCalled();

//   await waitFor(() => expect(mockFunction).toHaveBeenCalled(), {
//     timeout: 1000
//   });

//   vi.clearAllMocks();
//   // const header = screen.getByRole('form', { name: 'search-form' });

//   // const submitEvent = createEvent.submit(header);

//   // await fireEvent(header, submitEvent);

//   // expect(submitEvent.defaultPrevented).toBe(true);
// });
