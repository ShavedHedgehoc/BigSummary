import { router } from '../../trpc';
import { applicationMainRouter } from './main';
import { applicationTraceRouter } from './trace';

export const applicationRouter = router({
  main: applicationMainRouter,
  trace: applicationTraceRouter,
});
