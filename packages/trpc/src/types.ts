import type {
  TRegisteredUser,
  TGetWorkstationEmployeeByBarcodeInput,
  TWorkstationEmployeeByBarcodeOutput,
  TGetWorkstationConveyorByBarcodeInput,
  TWorkstationConveyorByBarcodeOutput,
  TGetDashPlantByValueInput,
  TDashPlantByValueOutput,
} from '@repo/schemas';

export interface IWorkstationEmployeeService {
  getEmployeeByBarcode: (
    input: TGetWorkstationEmployeeByBarcodeInput,
  ) => Promise<TWorkstationEmployeeByBarcodeOutput | null>;
}

export interface IWorkstationConveyorService {
  getConveyorByBarcode: (
    input: TGetWorkstationConveyorByBarcodeInput,
  ) => Promise<TWorkstationConveyorByBarcodeOutput | null>;
}

export interface IDashPlantService {
  getPlantByValue: (input: TGetDashPlantByValueInput) => Promise<TDashPlantByValueOutput | null>;
}

export interface ITrpcContext {
  workstationEmployeeService: IWorkstationEmployeeService;
  workstationConveyorService: IWorkstationConveyorService;

  dashPlantService: IDashPlantService;
  // authService: IAuthService;
  // trademarkService: ITrademarkService;
  // boilService: IBoilService;
  // cellService: ICellService;
  // materialService: IMaterialService;
  // userService: IUserService;
  // roleService: IRoleService;
  // lotService: ILotService;
  // planService: IPlanService;
  res: any;
  req: any;
  user: TRegisteredUser | null;
}
