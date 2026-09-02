import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { trpc } from '@/shared/api';

import type { AppRouter } from '@repo/trpc';
import { HealthProvider, useHealth } from './health-provider';

type AppRouterWithTransformer = AppRouter & {
  _def: { _config: { $types: { transformer: true } } };
};

function DataProviderContent({ children }: { children: ReactNode }) {
  const { setApiAlive } = useHealth();

  useEffect(() => {
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        const url = typeof args[0] === 'string' ? args[0] : '';

        if (url.includes('/trpc_api') && response.status === 500) {
          console.log('🚨 Перехвачена ошибка 500 через fetch!');
          setApiAlive(false);
        }
        return response;
      } catch (error) {
        const url = typeof args[0] === 'string' ? args[0] : '';
        if (url.includes('/trpc_api')) {
          console.log('🚨 Перехвачено падение сети через fetch!');
          setApiAlive(false);
        }
        throw error;
      }
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, [setApiAlive]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: false,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink<AppRouterWithTransformer>({
          url: '/trpc_api',
          transformer: superjson,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  return (
    <HealthProvider>
      <DataProviderContent>{children}</DataProviderContent>
    </HealthProvider>
  );
}
