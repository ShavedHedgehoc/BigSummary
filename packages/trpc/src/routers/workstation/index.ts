import { router } from '../../trpc';
import { workstationConveyorRouter } from './conveyor';
import { workstationEmployeeRouter } from './employee/index';
// import { workstationTerminalsRouter } from './terminals/index';

export const workstationRouter = router({
    employee: workstationEmployeeRouter,
    coveyor: workstationConveyorRouter,
    // terminals: workstationTerminalsRouter, <-- новые роутеры для воркстейшена добавляются сюда
});
