import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

import superjson from 'superjson';
import { trpc } from '../shared/trpc';

export function DataProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Отключает спам-запросы при переключении вкладок
            retry: 2, // Если запрос упал по сети, TanStack Query переповторит его ровно 2 раза
          },
        },
      }),
  );
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/trpc_api',
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
