import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@components/common/InputField';
import searchIcon from '@assets/icons/search-icon.svg';
import headerStyles from '@components/Header/header.module.css';
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

export const SearchInputFieldExample: Story = {
  args: {
    label: (
      <img
        src={searchIcon}
        alt="Search Icon"
        className={headerStyles['primary-icon']}
      />
    ),
    htmlFor: 'search',
    inputClass: headerStyles['search-input'],
    name: 'search',
    type: 'text',
    placeholder: 'Search for food, coffee, etc..'
  },
  decorators: [
    Story => (
      <div className={`d-flex ${headerStyles['search-form']}`}>
        <Story />
      </div>
    )
  ]
};

export const PriceInputFieldExample: Story = {
  args: {
    label: 'Price',
    htmlFor: 'price',
    labelClass: mutationModalStyles['mutation-label'],
    inputClass: mutationModalStyles['mutation-input'],
    name: 'price',
    type: 'number',
    value: `234`
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
    name: 'food',
    type: 'text',
    value: `Example`
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
