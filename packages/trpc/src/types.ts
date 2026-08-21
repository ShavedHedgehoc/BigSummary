import type {
  TRegisteredUser,
  TGetWorkstationEmployeeByBarcodeInput,
  TWorkstationEmployeeByBarcodeOutput,
  TGetWorkstationConveyorByBarcodeInput,
  TWorkstationConveyorByBarcodeOutput,
  TGetDashPlantByValueInput,
  TDashPlantByValueOutput,
  TDocDetailResponse,
  TGetDashDocRowInput,
  TRecordDetailResponse,
  TGetDashDocDataCurentInput,
  TGetDashDocDataCurentAppInput,
  TGetBoilListInput,
  TBoilListResponse,
  TGetDashTracePlantByValueInput,
  TDashTracePlantByValueOutput,
  TTracePlantListResponse,
  TTraceCanStateListResponse,
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

export interface IDashTracePlantService {
  // getPlantByValue: (input: TGetDashTracePlantByValueInput) => Promise<TDashTracePlantByValueOutput | null>;
  getAllPlants: () => Promise<TTracePlantListResponse | null>
}

export interface IDashBoilService {
  getBoilList: (input: TGetBoilListInput) => Promise<TBoilListResponse | null>;
}

export interface IDashDocService {
  getDocDataCurrent: (input: TGetDashDocDataCurentInput) => Promise<TDocDetailResponse | null>;
  getDocDataCurrentApp: (
    input: TGetDashDocDataCurentAppInput,
  ) => Promise<TDocDetailResponse | null>;
  getDocRecord: (input: TGetDashDocRowInput) => Promise<TRecordDetailResponse | null>;
}

export interface IDashTraceCanStateService {
  getAllCanStates: () => Promise<TTraceCanStateListResponse | null>
}

export interface ITrpcContext {
  workstationEmployeeService: IWorkstationEmployeeService;
  workstationConveyorService: IWorkstationConveyorService;
  dashPlantService: IDashPlantService;
  dashTracePlantService: IDashTracePlantService;
  dashTraceCanStateService: IDashTraceCanStateService;
  dashDocService: IDashDocService;
  dashBoilService: IDashBoilService;
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
