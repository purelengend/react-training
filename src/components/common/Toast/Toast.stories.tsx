import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@components/common/Toast';
import '@components/common/Toast/toast.module.css';
import { ToastType } from '@store/toast';

const meta: Meta<typeof Toast> = {
  title: 'Example/Toast',
  component: Toast,
  argTypes: {
    toastType: {
      description: 'Determine the type of toast is success or error'
    },
    isVisible: {
      description: 'Indicates whether the button is visible or hidden'
    },
    message: {
      description: 'The toast message'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

type Story = StoryObj<typeof Toast>;

export const ToastExample: Story = {
  args: {
    toastType: ToastType.Success,
    isVisible: true,
    message: 'Example toast message'
  }
};

export default meta;
