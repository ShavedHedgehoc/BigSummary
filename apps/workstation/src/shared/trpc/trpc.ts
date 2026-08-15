// import { createTRPCReact } from '@trpc/react-query';
// import type { AppRouter } from '@repo/api';
// export const trpc = createTRPCReact<AppRouter | any>();

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter as NestAppRouter } from '@repo/api';

// Принудительно вырезаем только внутреннюю структуру tRPC, 
// полностью игнорируя мешающие методы классов NestJS
type CleanAppRouter = Pick<NestAppRouter, '_def' | 'createCaller'>;

// Передаем клиенту отфильтрованный тип
export const trpc = createTRPCReact<CleanAppRouter>();
