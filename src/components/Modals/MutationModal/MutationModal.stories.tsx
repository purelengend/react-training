import type { Meta, StoryObj } from '@storybook/react';
import MutationModal from '@components/Modals/MutationModal';
import '@components/Modals/MutationModal/mutation-modal.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    productData: {
      description: 'The default data for the modal'
    }
  }
};

export default meta;

type Story = StoryObj<typeof MutationModal>;

export const MutationModalExample: Story = {
  args: {
    title: 'Sample Title',
    productData: {
      id: '0',
      name: 'Sample name',
      price: 213,
      imageUrl:
        'https://images.unsplash.com/photo-1614777986387-015c2a89b696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3774&q=80',
      quantity: 23,
      createdAt: new Date()
    },
    onSubmit: e => {
      e.preventDefault();
    }
  }
};
