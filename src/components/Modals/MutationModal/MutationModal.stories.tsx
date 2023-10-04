import type { Meta, StoryObj } from '@storybook/react';
import MutationModal from './index';
import './mutation-modal.module.css';
const meta: Meta<typeof MutationModal> = {
  title: 'Example/MutationModal',
  component: MutationModal,
  argTypes: {
    isVisible: {
      description: 'Indicates whether the modal is hidden or visible.'
    },
    title: {
      description: 'The title of the modal'
    },
    prodData: {
      description: 'The default data for the modal'
    }
  }
};

type Story = StoryObj<typeof MutationModal>;

export const MutationModalExample: Story = {
  args: {
    isVisible: true,
    title: 'Sample Title',
    prodData: {
      id: '0',
      name: 'Sample name',
      price: 213,
      imageUrl:
        'https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80',
      quantity: 23,
      createdAt: new Date().toDateString()
    }
  }
};
export default meta;
