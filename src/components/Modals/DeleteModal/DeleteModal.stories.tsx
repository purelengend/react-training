import type { Meta, StoryObj } from '@storybook/react';
import DeleteModal from './index';
import './delete-modal.module.css';
const meta: Meta<typeof DeleteModal> = {
  title: 'Example/DeleteModal',
  component: DeleteModal,
  argTypes: {
    isVisible: {
      description: 'Indicates whether the modal is hidden or visible.'
    }
  }
};

type Story = StoryObj<typeof DeleteModal>;

export const DeleteModalExample: Story = {
  args: {
    isVisible: true
  }
};
export default meta;
