import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import { trpc } from '../../../shared/api';

export function DataProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [

                httpBatchLink({
                    url: '/trpc_api',
                    transformer: superjson
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
}
