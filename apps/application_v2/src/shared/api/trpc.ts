import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@repo/trpc';

const trpcClient = createTRPCReact<AppRouter>();
export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = trpcClient;
