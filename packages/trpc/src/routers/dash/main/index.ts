import { router } from '../../../trpc';
import { dashMainBoilRouter } from './boil';
import { dashMainDocRouter } from './doc';
import { dashMainPlantRouter } from './plant';

export const dashMainRouter = router({
    boil: dashMainBoilRouter,
    doc: dashMainDocRouter,
    plant: dashMainPlantRouter,
});
