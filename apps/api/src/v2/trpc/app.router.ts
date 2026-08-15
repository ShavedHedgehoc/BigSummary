import { AppRouterHost } from 'nestjs-trpc';

// export type AppRouter = AppRouterHost['appRouter'];


// БЫЛО: export type AppRouter = AppRouterHost['appRouter'];
// СТАЛО (Чистый тип без метаданных NestJS):
export type AppRouter = AppRouterHost['appRouter']['_def']['_config']['$types']['_router'];
