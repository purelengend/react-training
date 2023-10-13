import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@components/common/Spinner';
import '@components/common/Spinner/spinner.module.css';
import mainStyles from '@pages/Main/main.module.css';
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

export const MainSpinnerExample: Story = {
  args: {
    customStyle: mainStyles['main-loading']
  }
};

export const ExpandSpinnerExample: Story = {
  args: {
    customStyle: mainStyles['expand-loading']
  }
};
export default meta;
