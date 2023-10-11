import type { Meta, StoryObj } from '@storybook/react';
import { AddCard } from '@components/common/Cards/AddCard';
import '@components/common/Cards/AddCard/add-card.module.css';
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
    onClick: {
      action: 'clicked',
      description: 'this is the mock function handler'
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

export const AddCardExample: Story = {};
