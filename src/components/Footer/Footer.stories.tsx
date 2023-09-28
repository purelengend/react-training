import type { Meta, StoryObj } from '@storybook/react';
import Footer from './index';
import './Footer.module.css';

const meta: Meta<typeof Footer> = {
  title: 'Example/Footer',
  component: Footer,
};

type Story = StoryObj<typeof Footer>;

export const FooterExample: Story = {};
export default meta;
