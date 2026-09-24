import { router } from '../../trpc';
import { applicationMainRouter } from './main';

export const applicationRouter = router({
  main: applicationMainRouter,
  // trace:
});
