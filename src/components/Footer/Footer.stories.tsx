import type { Meta, StoryObj } from '@storybook/react';
import Footer from './index';
import './Footer.module.css';
import layoutStyles from '../../layout/layout.module.css';

const meta: Meta<typeof Footer> = {
  title: 'Example/Footer',
  component: Footer,
  decorators: [
    Story => (
      <div className={layoutStyles.container}>
        <Story />
      </div>
    )
  ]
};

type Story = StoryObj<typeof Footer>;

export const FooterExample: Story = {};
export default meta;
