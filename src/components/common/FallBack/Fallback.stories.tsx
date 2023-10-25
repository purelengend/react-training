import type { Meta, StoryObj } from '@storybook/react';
import '@components/common/Spinner/spinner.module.css';
import { Fallback } from '.';
const meta: Meta<typeof Fallback> = {
  title: 'Example/Fallback',
  component: Fallback,
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

type Story = StoryObj<typeof Fallback>;

export const FallbackExample: Story = {};

export default meta;
