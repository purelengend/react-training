import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import renderer from 'react-test-renderer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export const AllTheProviders = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

const customRenderer = (ui: ReactElement) =>
  renderer.create(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );

export * from '@testing-library/react';
export { customRender as render, customRenderer as renderer };
