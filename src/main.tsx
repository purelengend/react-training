'use client';

import App from '@src/App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import './wdyr';
import '@src/main.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '@components/common/FallBack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<Fallback />}>
        <App />
      </ErrorBoundary>
    </QueryClientProvider>
  </React.StrictMode>
);
