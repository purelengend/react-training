import { customRenderer, render } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import { AddCard } from '..';

describe('AddCard test cases', () => {
  it('should render correctly with onclick function', () => {
    const mockOnClick = vi.fn();

    const mockAddCard = customRenderer(<AddCard onClick={mockOnClick} />);

    expect(mockAddCard.toJSON()).toMatchSnapshot();
  });

  it('should invoke onclick function when being clicked', async () => {
    const mockOnClick = vi.fn();

    const { container } = render(<AddCard onClick={mockOnClick} />);

    const mockAddCard = container.querySelector('#add-card')!;

    await userEvent.click(mockAddCard);

    expect(mockOnClick).toBeCalled();
  });
});
