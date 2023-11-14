import { customRender, customRenderer, screen } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import Header from '..';

// This script is to prevent error messages when mocking anchor tag onclick function
const listeners = window._virtualConsole.listeners('jsdomError');
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners('jsdomError');

// Add a new listener to swallow JSDOM errors that ordinate from clicks on anchor tags.
window._virtualConsole.addListener('jsdomError', error => {
  if (
    error.type !== 'not implemented' &&
    error.message !== 'Not implemented: navigation (except hash changes)' &&
    originalListener
  ) {
    originalListener(error);
  }

  // swallow error
});

describe('Header test case', () => {
  it('should render correctly', () => {
    const mockHeader = customRenderer(<Header />);

    expect(mockHeader.toJSON()).toMatchSnapshot();
  });

  it('should invoke refresh function when click the heading', async () => {
    customRender(<Header />);

    const mockOnRefresh = vi.fn();

    const heading = screen.getByRole('link', {
      name: /foods management/i
    });

    heading.onclick = mockOnRefresh;

    await userEvent.click(heading);

    expect(mockOnRefresh).toHaveBeenCalled();
  });

  it('should invoke onChange function when select options', async () => {
    customRender(<Header />);

    const mockOnChangeSelection = vi.fn();

    const select = screen.getByRole('combobox', {
      name: /sort/i
    });

    select.onchange = mockOnChangeSelection;

    const selectOption = screen.getByRole('option', { name: 'Ascending' });

    await userEvent.selectOptions(select, selectOption);

    expect(mockOnChangeSelection).toHaveBeenCalled();
  });
});
