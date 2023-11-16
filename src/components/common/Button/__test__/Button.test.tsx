import { customRender, customRenderer, screen } from '@src/test/test-utils';
import userEvent from '@testing-library/user-event';

import { Button } from '..';

describe('Button test cases', () => {
  it('should render correctly with children and be visible by default', () => {
    const mockButton = customRenderer(<Button>Mock Children</Button>);

    expect(mockButton.toJSON()).toMatchSnapshot();
  });

  it('should accept custom class name', () => {
    const mockClassName = 'mock-class-name';
    const mockButton = customRenderer(
      <Button className={mockClassName}>Mock Children</Button>
    );

    expect(mockButton.toJSON()).toMatchSnapshot();
  });

  it('should accept different type', () => {
    const mockSubmitButton = customRenderer(
      <Button type="submit">Mock Children</Button>
    );

    const mockResetButton = customRenderer(
      <Button type="reset">Mock Children</Button>
    );

    const mockButton = customRenderer(
      <Button type="button">Mock Children</Button>
    );

    expect(mockSubmitButton.toJSON()).toMatchSnapshot();
    expect(mockResetButton.toJSON()).toMatchSnapshot();
    expect(mockButton.toJSON()).toMatchSnapshot();
  });

  it('should be hidden', () => {
    const mockButton = customRenderer(
      <Button isVisible={false}>Mock Children</Button>
    );

    expect(mockButton.getInstance()).toBeNull();
  });

  it('should accept the custom dataId attribute', () => {
    const mockDataId = '55';

    const mockButton = customRenderer(
      <Button dataId={`${mockDataId}`}>Mock Children</Button>
    );

    expect(mockButton.toJSON()).toMatchSnapshot();
  });

  it('should accept custom onClick function and invoke it when being clicked', async () => {
    customRender(<Button>Mock Children</Button>);

    const mockOnClick = vi.fn();

    const mockButton = screen.getByRole('button');

    mockButton.onclick = mockOnClick;

    await userEvent.click(mockButton);

    expect(mockOnClick).toBeCalled();
  });
});
