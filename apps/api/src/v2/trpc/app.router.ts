import { AppRouterHost } from 'nestjs-trpc';

// Напрямую вытаскиваем и экспортируем тип роутера, собранного библиотекой
export type AppRouter = AppRouterHost['appRouter'];
