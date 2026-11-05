import { router } from '../../../trpc';
import { applicationTraceCanRouter } from './can';
import { applicationTraceCanStateRouter } from './can-state';
import { applicationTraceInventoryRouter } from './inventory';
import { applicationTracePlantRouter } from './plant';

export const applicationTraceRouter = router({
  can: applicationTraceCanRouter,
  canState: applicationTraceCanStateRouter,
  inventory: applicationTraceInventoryRouter,
  plant: applicationTracePlantRouter,
});
