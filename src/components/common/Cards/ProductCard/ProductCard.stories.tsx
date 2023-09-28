import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './index';
import './product-card.module.css';
const meta: Meta<typeof ProductCard> = {
  title: 'Example/ProductCard',
  component: ProductCard,
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
    },
    product: {
      description: 'the product object contains all the information fields'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const ProductCardExample: Story = {
  args: {
    product: {
      id: '0',
      name: 'test product',
      price: 123,
      imageUrl:
        'https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80',
      quantity: 4,
      createdAt: new Date()
    }
  }
};
