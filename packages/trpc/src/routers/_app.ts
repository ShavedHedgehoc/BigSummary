import { router } from '../trpc';
import { dashRouter } from './dash';
import { workstationRouter } from './workstation';

export const appRouter = router({
  workstation: workstationRouter,
  dash: dashRouter,
});

export type AppRouter = typeof appRouter;
