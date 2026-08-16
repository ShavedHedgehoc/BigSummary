import { router } from '../../trpc';
import { dashPlantRouter } from './plant';

export const dashRouter = router({
  plant: dashPlantRouter,
});
