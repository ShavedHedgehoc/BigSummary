import { router } from '../../../trpc';
import { applicationTraceBoilRouter } from './boil';
import { applicationTraceCanRouter } from './can';
import { applicationTraceCanStateRouter } from './can-state';
import { applicationTraceInventoryRouter } from './inventory';
import { applicationTracePlantRouter } from './plant';

export const applicationTraceRouter = router({
  boil: applicationTraceBoilRouter,
  can: applicationTraceCanRouter,
  canState: applicationTraceCanStateRouter,
  inventory: applicationTraceInventoryRouter,
  plant: applicationTracePlantRouter,
});
