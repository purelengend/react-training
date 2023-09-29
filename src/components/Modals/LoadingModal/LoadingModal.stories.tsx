import type { Meta, StoryObj } from '@storybook/react';
import LoadingModal from './index';
import './loading-modal.module.css';
const meta: Meta<typeof LoadingModal> = {
  title: 'Example/LoadingModal',
  component: LoadingModal,
  argTypes: {
    isVisible: {
      description: 'Indicates whether the modal is hidden or visible.'
    }
  }
};

type Story = StoryObj<typeof LoadingModal>;

export const LoadingModalExample: Story = {
  args: {
    isVisible: true
  }
};
export default meta;
