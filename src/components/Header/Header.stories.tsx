import type { Meta, StoryObj } from '@storybook/react';
import Header from '@components/Header';
import '@components/Header/header.module.css';
import layoutStyles from '@layout/layout.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } }
});

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <div className={layoutStyles.container}>
          <Story />
        </div>
      </QueryClientProvider>
    )
  ]
};

type Story = StoryObj<typeof Header>;

export const HeaderExample: Story = {};
export default meta;
