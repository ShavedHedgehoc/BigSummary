import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { NextRequest } from 'next/server';
import type { AnyRouter } from '@trpc/server';

const handler = async (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc_api',
    req,
    router: {} as AnyRouter,
    createContext: () => ({}),
  });
};

export { handler as GET, handler as POST };
