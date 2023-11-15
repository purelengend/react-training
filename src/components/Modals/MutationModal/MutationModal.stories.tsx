import type { Meta, StoryObj } from '@storybook/react';
import MutationModal from '@components/Modals/MutationModal';
import '@components/Modals/MutationModal/mutation-modal.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Food } from '@components/common/Cards/ProductCard';
import { defaultData } from '@constants/food';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } }
});

const meta: Meta<typeof MutationModal> = {
  title: 'Example/MutationModal',
  component: MutationModal,
  decorators: [
    Story => {
      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    }
  ],
  argTypes: {
    title: {
      description: 'The title of the modal'
    },
    onSubmit: {
      action: 'submitted',
      description: 'The submit method for the modal'
    },
    onCancelClick: {
      action: 'closed',
      description: 'The cancel method is used to close the modal'
    }
  },
  parameters: {
    controls: {
      expanded: true
    }
  }
};

export default meta;

type Story = StoryObj<typeof MutationModal>;

export const MutationModalExample: Story = {
  args: {
    title: 'Sample Title',
    onSubmit: e => {
      e.preventDefault();
    }
  },
  render: function Render(args) {
    const { control, register } = useForm<Food>({
      defaultValues: defaultData
    });
    return <MutationModal {...args} control={control} register={register} />;
  }
};
