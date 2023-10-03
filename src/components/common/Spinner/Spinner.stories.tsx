import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './index';
import './Spinner.module.css';

const meta: Meta<typeof Spinner> = {
  title: 'Example/Spinner',
  component: Spinner,
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
  ]
};

type Story = StoryObj<typeof Spinner>;

export const SpinnerExample: Story = {};
export default meta;