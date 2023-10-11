import type { Meta, StoryObj } from '@storybook/react';
import ConfirmModal from '@components/Modals/ConfirmModal';
import '@components/Modals/ConfirmModal/confirm-modal.module.css';
const meta: Meta<typeof ConfirmModal> = {
  title: 'Example/ConfirmModal',
  component: ConfirmModal,
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
    isVisible: {
      description: 'Indicates whether the modal is hidden or visible.'
    },
    onSubmit: {
      description: 'The submit function to be called when submitting the modal',
      action: true
    },
    dataId: {
      description: 'The value of hidden id input field of the modal',
      defaultValue: '0'
    },
    message: {
      description: 'The message of the modal'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  },
  
};

type Story = StoryObj<typeof ConfirmModal>;

export const ConfirmModalExample: Story = {
  args: {
    isVisible: true,
    message: 'Sample message of the modal',
    onSubmit: e => {
      e.preventDefault();
    }
  }
};
export default meta;
