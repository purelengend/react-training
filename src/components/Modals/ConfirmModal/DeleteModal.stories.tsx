import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '@components/Modals/ConfirmModal';
import '@components/Modals/ConfirmModal/confirm-modal.module.css';
const meta: Meta<typeof ConfirmModal> = {
  title: 'Example/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isVisible: {
      description: 'Indicates whether the modal is hidden or visible.'
    }
  }
};

type Story = StoryObj<typeof ConfirmModal>;

export const ConfirmModalExample: Story = {
  args: {
    isVisible: true
  }
};
export default meta;
