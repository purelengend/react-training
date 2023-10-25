import Header from '@src/components/Header';
import { render } from '@src/test/test-utils';
import { createEvent, fireEvent, screen } from '@testing-library/react';

describe('Header test cases', () => {
  it('should have an search input', async () => {
    render(<Header />);

    const searchInput = screen.getByRole('textbox', {
      name: /search icon/i
    });

    expect(searchInput).toBeInTheDocument();
  });

  it('should prevent default submit behavior of search input', async () => {
    render(<Header />);

    const header = screen.getByRole('form', { name: 'search-form' });

    const submitEvent = createEvent.submit(header);

    await fireEvent(header, submitEvent);

    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
