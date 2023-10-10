import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@components/common/Select';
import '@components/common/Select/select.module.css';
import {
  DEFAULT_FILTER_ATTRIBUTE,
  ASCENDING_FILTER_ATTRIBUTE,
  DESCENDING_FILTER_ATTRIBUTE
} from '@constants/filter';

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
    selectOptions: {
      description: 'The options of the select, e.g. text, react components'
    },
    onChange: {
      description: 'The event fired when the select changes',
      action: true
    },
    value: {
      description: 'The string value of the select'
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
    <Select
      {...args}
      selectOptions={[
        {
          value: undefined,
          disabled: true,
          label: 'Sort by price'
        },
        {
          value: DEFAULT_FILTER_ATTRIBUTE,
          disabled: false,
          label: 'Default'
        },
        {
          value: ASCENDING_FILTER_ATTRIBUTE,
          disabled: false,
          label: 'Ascending'
        },
        {
          value: DESCENDING_FILTER_ATTRIBUTE,
          disabled: false,
          label: 'Descending'
        }
      ]}
    ></Select>
  )
};
