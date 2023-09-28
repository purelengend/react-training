import type { Meta, StoryObj } from '@storybook/react';
import Header from './index';
import './Header.module.css';
import layoutStyles from '../../layout/layout.module.css';
const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  decorators: [
    Story => (
      <div className={layoutStyles.container}>
        <Story />
      </div>
    )
  ]
};

type Story = StoryObj<typeof Header>;

export const HeaderExample: Story = {};
export default meta;
