import type { Meta, StoryObj } from '@storybook/react';
import { AddCard } from './index';
import './add-card.module.css';
const meta: Meta<typeof AddCard> = {
  title: 'Example/AddCard',
  component: AddCard,
  decorators: [
    Story => (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '90vh'
        }}
      >
        <Story />
      </div>
    )
  ],
  argTypes: {
    handleClick: {
      action: 'clicked',
      description: 'the function feature will be implemented later'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof AddCard>;

export const Primary: Story = {};
