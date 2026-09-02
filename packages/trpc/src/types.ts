import type {
  TRegisteredUser,
  TGetWorkstationEmployeeByBarcodeInput,
  TWorkstationEmployeeByBarcodeOutput,
  TGetWorkstationConveyorByBarcodeInput,
  TWorkstationConveyorByBarcodeOutput,
  TGetPlantByValueInput,
  TPlantByValueOutput,
  TDocDetailResponse,
  TGetDashDocRowInput,
  TRecordDetailResponse,
  TGetDashDocDataCurentInput,
  TGetDashDocDataCurentAppInput,
  TGetBoilListInput,
  TBoilListResponse,
  TTracePlantListResponse,
  TTraceCanStateListResponse,
  TGetDashTraceCanDataListInput,
  TDashTraceCanDataListResponse,
  TDashTraceCanVolumeListResponse,
  TDashTraceCanRecordListResponse,
  TGetDashTraceCanRecordListInput,
  THealthCheckOutput,
  TGetWorkstationHistoryListInput,
  TWorkstationHistoryListResponse,
  TWorkstationRelatedRecordListInput,
  TWorkstationRelatedRecordListResponse,
  TCreateWorkstationHistoryInput,
  TWorkstationCreateHistoryResponse,
  TLoginInput,
  TLoginResponse,
  TRegisterInput,
} from '@repo/schemas';

export interface IHealthService {
  check: () => Promise<THealthCheckOutput | null>;
}

export interface IAuthService {
  login: (input: TLoginInput) => Promise<TLoginResponse>;
  register: (input: TRegisterInput) => Promise<TLoginResponse>;
  me: (userId: number) => Promise<TLoginResponse['user']>;
  logout: (refreshToken: string) => Promise<{ success: boolean }>;
  refresh: (refreshToken: string) => Promise<TLoginResponse>;
}

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
  getPlantByValue: (input: TGetPlantByValueInput) => Promise<TPlantByValueOutput | null>;
}

export interface IWorkstationPlantService {
  getPlantByValue: (input: TGetPlantByValueInput) => Promise<TPlantByValueOutput | null>;
}
export interface IWorkstationHistoryService {
  getLastEmployeeHistoriesByPlantId: (
    input: TGetWorkstationHistoryListInput,
  ) => Promise<TWorkstationHistoryListResponse | null>;
  createHistory: (
    input: TCreateWorkstationHistoryInput,
  ) => Promise<TWorkstationCreateHistoryResponse | null>;
}

export interface IWorkstationRecordService {
  getRelatedRecords: (
    input: TWorkstationRelatedRecordListInput,
  ) => Promise<TWorkstationRelatedRecordListResponse | null>;
}

export interface IDashTracePlantService {
  getAllPlants: () => Promise<TTracePlantListResponse | null>;
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
  getAllCanStates: () => Promise<TTraceCanStateListResponse | null>;
}

export interface IDashTraceCanRecordService {
  getLastCanRecordListByCanId: (
    input: TGetDashTraceCanRecordListInput,
  ) => Promise<TDashTraceCanRecordListResponse | null>;
}

export interface IDashTraceCanService {
  getCanVolumesList: () => Promise<TDashTraceCanVolumeListResponse | null>;
  getCanDataList: (
    input: TGetDashTraceCanDataListInput,
  ) => Promise<TDashTraceCanDataListResponse | null>;
}
export interface ITrpcContext {
  workstationEmployeeService: IWorkstationEmployeeService;
  workstationConveyorService: IWorkstationConveyorService;
  dashPlantService: IDashPlantService;
  workstationPlantService: IDashPlantService;
  workstationHistoryService: IWorkstationHistoryService;
  workstationRecordService: IWorkstationRecordService;
  dashTracePlantService: IDashTracePlantService;
  dashTraceCanService: IDashTraceCanService;
  dashTraceCanStateService: IDashTraceCanStateService;
  dashTraceCanRecordService: IDashTraceCanRecordService;
  dashDocService: IDashDocService;
  dashBoilService: IDashBoilService;
  healthService: IHealthService;
  authService: IAuthService;
  res: any;
  req: any;
  user: TRegisteredUser | null;
}
