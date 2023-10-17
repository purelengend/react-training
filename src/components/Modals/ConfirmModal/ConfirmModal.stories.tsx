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
    onSubmit: {
      description: 'The submit function to be called when submitting the modal',
      action: 'submitted'
    },
    dataId: {
      description: 'The value of hidden id input field of the modal',
      defaultValue: '0'
    },
    message: {
      description: 'The message of the modal'
    },
    onCancelClick: {
      description: 'The cancel method is used to close the modal',
      action: 'closed'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

type Story = StoryObj<typeof ConfirmModal>;

export const ConfirmModalExample: Story = {
  args: {
    message: 'Sample message of the modal',
    onSubmit: e => {
      e.preventDefault();
    }
  }
};
export default meta;
