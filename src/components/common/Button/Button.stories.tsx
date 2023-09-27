import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import mainStyles from '../../Main/main.module.css';
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: `modal-btn confirm`,
    isVisible: true
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    className: `${mainStyles['expand-btn']}`,
    isVisible: true
  }
};
