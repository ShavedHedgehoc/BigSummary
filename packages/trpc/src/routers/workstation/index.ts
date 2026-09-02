import { router } from '../../trpc';
import { workstationConveyorRouter } from './conveyor';
import { workstationEmployeeRouter } from './employee';
import { workstationHistoryRouter } from './history';
import { workstationPlantRouter } from './plant';
import { workstationRecordRouter } from './record';
// import { workstationTerminalsRouter } from './terminals/index';

export const workstationRouter = router({
  employee: workstationEmployeeRouter,
  conveyor: workstationConveyorRouter,
  plant: workstationPlantRouter,
  history: workstationHistoryRouter,
  record: workstationRecordRouter,
  // terminals: workstationTerminalsRouter, <-- новые роутеры для воркстейшена добавляются сюда
});
