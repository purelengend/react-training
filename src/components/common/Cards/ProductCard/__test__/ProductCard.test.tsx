import { defaultData } from '@constants/food';
import { customRenderer, render } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import { ProductCard } from '..';

const mockFood = defaultData;

describe('ProductCard test cases', () => {
  it('should render correctly with required functions props', () => {
    const mockOnClick = vi.fn();

    const mockProductCard = customRenderer(
      <ProductCard
        product={mockFood}
        onDeleteClick={mockOnClick}
        onEditClick={mockOnClick}
      />
    );

    expect(mockProductCard.toJSON()).toMatchSnapshot();
  });

  it('should invoke functions when being clicked', async () => {
    const mockOnDeleteClick = vi.fn();
    const mockOnEditClick = vi.fn();

    const { container } = render(
      <ProductCard
        product={mockFood}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
      />
    );

    const mockButtonList = container.getElementsByTagName('button');

    await userEvent.click(mockButtonList[0]);

    expect(mockOnDeleteClick).toBeCalled();

    await userEvent.click(mockButtonList[1]);

    expect(mockOnEditClick).toBeCalled();
  });
});
