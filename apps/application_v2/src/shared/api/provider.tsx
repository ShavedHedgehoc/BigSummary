'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, createTRPCUntypedClient, TRPCClientError } from '@trpc/client';
import superjson from 'superjson';
import { trpc } from './trpc';

let refreshPromise: Promise<void> | null = null;

export function TRPCProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [reactQueryClient] = useState(() => {
    const vanillaClient = createTRPCUntypedClient({
      links: [
        httpBatchLink({
          url: `/trpc_api`,
          transformer: superjson,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' });
          },
        }),
      ],
    });
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: (failureCount, error: unknown) => {
            let isAuthError = false;
            if (error instanceof TRPCClientError) {
              isAuthError =
                error.data?.code === 'UNAUTHORIZED' ||
                error.shape?.data?.code === 'UNAUTHORIZED' ||
                error.data?.httpStatus === 401 ||
                error.message?.includes('UNAUTHORIZED');
            }
            if (isAuthError && failureCount === 0) {
              if (!refreshPromise) {
                refreshPromise = vanillaClient
                  .mutation('auth.refresh', undefined)
                  .then(() => {
                    client.invalidateQueries({ queryKey: [['auth', 'me']] });
                  })
                  .catch((_err: unknown) => {
                    client.clear();
                    router.push('/login');
                  })
                  .finally(() => {
                    refreshPromise = null;
                  });
              }
              return true;
            }
            if (isAuthError && failureCount > 0) {
              return false;
            }
            return failureCount < 2;
          },
          retryDelay: (_failureCount, error: unknown) => {
            let isAuthError = false;
            if (error instanceof TRPCClientError) {
              isAuthError = error.data?.code === 'UNAUTHORIZED' || error.data?.httpStatus === 401;
            }
            return isAuthError ? 1500 : 3000;
          },
        },
      },
    });

    return client;
  });

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: `/trpc_api`,
          transformer: superjson,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' });
          },
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={reactQueryClient}>
      <QueryClientProvider client={reactQueryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
