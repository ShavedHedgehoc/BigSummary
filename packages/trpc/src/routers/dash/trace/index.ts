import { router } from '../../../trpc';
import { dashTraceCanRouter } from './can';
import { dashTraceCanRecordRouter } from './can-record';
import { dashTraceCanStateRouter } from './can-state';
import { dashTracePlantRouter } from './plant';

export const dashTraceRouter = router({
  can: dashTraceCanRouter,
  canState: dashTraceCanStateRouter,
  canRecord: dashTraceCanRecordRouter,
  plant: dashTracePlantRouter,
});
