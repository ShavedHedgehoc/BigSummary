import { router } from '../../../trpc';
import { applicationBaseRouter } from './base';
import { applicationMainBoilRouter } from './boil';
import { applicationMainConveyorRouter } from './conveyor';
import { applicationMainDocRouter } from './doc';
import { applicationMainHistoryRouter } from './history';
import { applicationMainHistoryTypeRouter } from './history-type';
import { applicationMainPlantRouter } from './plant';
import { applicationMainRoleRouter } from './role';
import { applicationMainUserRouter } from './user';

export const applicationMainRouter = router({
  boil: applicationMainBoilRouter,
  base: applicationBaseRouter,
  conveyor: applicationMainConveyorRouter,
  doc: applicationMainDocRouter,
  plant: applicationMainPlantRouter,
  history: applicationMainHistoryRouter,
  historyType: applicationMainHistoryTypeRouter,
  role: applicationMainRoleRouter,
  user: applicationMainUserRouter,
});
