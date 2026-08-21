import { router } from '../../trpc';
import { dashMainRouter } from './main';
import { dashTraceRouter } from './trace';

export const dashRouter = router({
  main: dashMainRouter,
  trace: dashTraceRouter

});
