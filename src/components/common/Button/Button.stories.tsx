import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import mainStyles from '../../Main/main.module.css';
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
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
    children: {
      description: 'The children of the button, e.g. text, react components'
    },
    className: {
      description: 'The css class inherited from the parent'
    },
    handleClick: {
      description: 'The click event handling function from the parent'
    },
    isVisible: {
      description:
        'Indicates whether the button is visible or hidden'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: `modal-btn confirm`,
    isVisible: true
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    className: `${mainStyles['expand-btn']}`,
    isVisible: true
  }
};
