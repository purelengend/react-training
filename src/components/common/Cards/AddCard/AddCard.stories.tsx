import type { Meta, StoryObj } from '@storybook/react';
import { AddCard } from './index';
import './add-card.module.css';
const meta: Meta<typeof AddCard> = {
  title: 'Example/AddCard',
  component: AddCard
};

export default meta;

type Story = StoryObj<typeof AddCard>;

export const Primary: Story = {};
