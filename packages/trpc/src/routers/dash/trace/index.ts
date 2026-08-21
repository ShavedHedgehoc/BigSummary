import { router } from '../../../trpc';
import { dashTraceCanStateRouter } from './can-state';
import { dashTracePlantRouter } from './plant';


export const dashTraceRouter = router({
    plant: dashTracePlantRouter,
    canState: dashTraceCanStateRouter,
});
