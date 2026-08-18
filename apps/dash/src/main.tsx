import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app/App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DataProvider } from './app/data-provider.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <DataProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </DataProvider>,
);
