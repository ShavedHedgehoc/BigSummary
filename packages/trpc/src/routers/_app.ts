import { router } from '../trpc';
import { authRouter } from './auth';
import { dashRouter } from './dash';
import { healtRouter } from './health';
import { workstationRouter } from './workstation';

export const appRouter = router({
  workstation: workstationRouter,
  dash: dashRouter,
  health: healtRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
