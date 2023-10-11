import type { Meta, StoryObj } from '@storybook/react';
import { SelectOption } from '@components/common/Select/SelectOption';
import '@components/common/Select/SelectOption/select-option.module.css';

const meta: Meta<typeof SelectOption> = {
  title: 'Example/Select/SelectOption',
  component: SelectOption,
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
      description:
        'The children of the select option, e.g. text, react components'
    },
    disable: {
      description: 'Disables the select option'
    },
    value: {
      description: 'The string value of the select option'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  },
  
};

type Story = StoryObj<typeof SelectOption>;

export const SelectOptionExample: Story = {
  args: {
    children: 'test children',
    disable: false,
    value: 'test value'
  }
};
export default meta;
