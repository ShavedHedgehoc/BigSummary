import { router } from '../../../trpc';
import { applicationMainBoilRouter } from './boil';
import { applicationMainDocRouter } from './doc';
import { applicationMainHistoryRouter } from './history';
import { applicationMainHistoryTypeRouter } from './history-type';
import { applicationMainPlantRouter } from './plant';

export const applicationMainRouter = router({
  boil: applicationMainBoilRouter,
  doc: applicationMainDocRouter,
  plant: applicationMainPlantRouter,
  history: applicationMainHistoryRouter,
  historyType: applicationMainHistoryTypeRouter,
});
