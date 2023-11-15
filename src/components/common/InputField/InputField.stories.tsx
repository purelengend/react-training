import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@components/common/InputField';
import mutationModalStyles from '@components/Modals/MutationModal/mutation-modal.module.css';
const meta: Meta<typeof InputField> = {
  title: 'Example/InputField',
  component: InputField,
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
    label: {
      description: 'The children of the label, e.g. text, react components'
    },
    inputClass: {
      description: 'The css class of input field inherited from the parent'
    },
    labelClass: {
      description: 'The css class of label field inherited from the parent'
    },
    htmlFor: {
      description:
        'Specifies the id of the form element the label should be bound to'
    },
    name: {
      description: 'The name of the input field'
    },
    type: {
      description: 'The value of the input field'
    },
    placeholder: {
      description: 'The placeholder of the input field'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const PriceInputFieldExample: Story = {
  args: {
    label: 'Price',
    htmlFor: 'price',
    labelClass: mutationModalStyles['mutation-label'],
    inputClass: mutationModalStyles['mutation-input'],
    name: 'price',
    type: 'number'
  },
  decorators: [
    Story => (
      <div
        className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
      >
        <Story />
      </div>
    )
  ]
};

export const NameInputFieldExample: Story = {
  args: {
    label: 'Name',
    htmlFor: 'food',
    labelClass: mutationModalStyles['mutation-label'],
    inputClass: mutationModalStyles['mutation-input'],
    name: 'name',
    type: 'text'
  },
  decorators: [
    Story => (
      <div
        className={`d-flex-col ${mutationModalStyles['mutation-form-field']}`}
      >
        <Story />
      </div>
    )
  ]
};
