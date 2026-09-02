import { createTRPCProxyClient, createTRPCReact, httpBatchLink } from '@trpc/react-query';
import type { AppRouter } from '@repo/trpc';
import superjson from 'superjson';

const trpcClient = createTRPCReact<AppRouter>();
export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = trpcClient;

type AppRouterWithTransformer = AppRouter & {
  _def: { _config: { $types: { transformer: true } } };
};

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink<AppRouterWithTransformer>({
      url: '/trpc_api',
      transformer: superjson,
    }),
  ],
});
