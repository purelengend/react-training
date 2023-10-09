import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@components/common/Select';
import { SelectOption } from '@components/common/Select/SelectOption';
import '@components/common/Select/select.module.css';

const meta: Meta<typeof Select> = {
  title: 'Example/Select',
  component: Select,
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
      description: 'The children of the select, e.g. text, react components'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof Select>;

export const SelectExample: Story = {
  render: args => (
    <Select {...args}>
      <SelectOption disable>Value 1</SelectOption>
      <SelectOption>Value 2</SelectOption>
      <SelectOption>Value 3</SelectOption>
    </Select>
  )
};
