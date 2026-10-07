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
  TCreateHistoryInput,
  TCreateHistoryResponse,
  TLoginInput,
  TLoginResponse,
  TRegisterInput,
  TGetApplicationDocListInput,
  TApplicationDocListResponse,
  TApplicationPlantListResponse,
  TApplicationDeleteDocInput,
  TApplicationDeleteDocResponse,
  TApplicationUploadDocInput,
  TApplicationUploadDocResponse,
  TApplicationDocStatsResponse,
  TApplicationGetDocStatsInput,
  TApplicationGetDocDetailInput,
  TApplicationDocDetailResponse,
  TApplicationDeleteDocRowResponse,
  TApplicationDeleteDocRowInput,
  TApplicationHistoryTypeListResponse,
  TApplicationDeleteHistoryInput,
  TApplicationDeleteHistoryResponse,
  TApplicationUpdateDocRowResponse,
  TApplicationUpdateDocRowInput,
  TGetApplicationLabBoilListInput,
  TApplicationBoilListResponse,
  TApplicationGetCurrentDocInput,
  TApplicationRoleListResponse,
  TApplicationUserListResponse,
  TGetApplicationUserListInput,
  TApplicationUpdateUserInput,
  TApplicationUpdateUserResponse,
  TApplicationChangeUserAccessInput,
  TApplicationChangeUserAccessResponse,
  TApplicationResetUserPasswordInput,
  TApplicationResetUserPasswordResponse,
  TApplicationChangeUserPasswordResponse,
  TApplicationChangeUserPasswordInput,
  TApplicationDeleteUserInput,
  TApplicationDeleteUserResponse,
  TApplicationUpdateUserRolesInput,
  TApplicationUpdateUserRolesResponse,
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
// workstation
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

export interface IWorkstationPlantService {
  getPlantByValue: (input: TGetPlantByValueInput) => Promise<TPlantByValueOutput | null>;
}
export interface IWorkstationHistoryService {
  getLastEmployeeHistoriesByPlantId: (
    input: TGetWorkstationHistoryListInput,
  ) => Promise<TWorkstationHistoryListResponse | null>;
  createHistory: (input: TCreateHistoryInput) => Promise<TCreateHistoryResponse | null>;
}

export interface IWorkstationRecordService {
  getRelatedRecords: (
    input: TWorkstationRelatedRecordListInput,
  ) => Promise<TWorkstationRelatedRecordListResponse | null>;
}

// dash
export interface IDashPlantService {
  getPlantByValue: (input: TGetPlantByValueInput) => Promise<TPlantByValueOutput | null>;
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

// application

export interface IApplicationBoilService {
  getBoilList: (
    input: TGetApplicationLabBoilListInput,
  ) => Promise<TApplicationBoilListResponse | null>;
}

export interface IApplicationDocService {
  getDocList: (input: TGetApplicationDocListInput) => Promise<TApplicationDocListResponse | null>;
  deleteDoc: (input: TApplicationDeleteDocInput) => Promise<TApplicationDeleteDocResponse>;
  deleteDocRow: (input: TApplicationDeleteDocRowInput) => Promise<TApplicationDeleteDocRowResponse>;
  updateDocRow: (input: TApplicationUpdateDocRowInput) => Promise<TApplicationUpdateDocRowResponse>;
  uploadData: (input: TApplicationUploadDocInput) => Promise<TApplicationUploadDocResponse>;
  getStats: (input: TApplicationGetDocStatsInput) => Promise<TApplicationDocStatsResponse | null>;
  getDetails: (
    input: TApplicationGetDocDetailInput,
  ) => Promise<TApplicationDocDetailResponse | null>;
  getCurrentDoc: (
    input: TApplicationGetCurrentDocInput,
  ) => Promise<TApplicationDocDetailResponse | null>;
}

export interface IApplicationPlantService {
  getPlantList: () => Promise<TApplicationPlantListResponse | null>;
}

export interface IApplicationHistoryTypeService {
  getAllHistoryTypeList: () => Promise<TApplicationHistoryTypeListResponse | null>;
  getProductHistoryTypeList: () => Promise<TApplicationHistoryTypeListResponse | null>;
  getBoilHistoryTypeList: () => Promise<TApplicationHistoryTypeListResponse | null>;
}

export interface IApplicationHistoryService {
  createHistory: (input: TCreateHistoryInput) => Promise<TCreateHistoryResponse | null>;
  directCreateHistory: (input: TCreateHistoryInput) => Promise<TCreateHistoryResponse | null>;
  deleteHistory: (
    input: TApplicationDeleteHistoryInput,
  ) => Promise<TApplicationDeleteHistoryResponse>;
}

export interface IApplicationRoleService {
  getRoleList: () => Promise<TApplicationRoleListResponse | null>;
}

export interface IApplicationUserService {
  getUserList: (
    input: TGetApplicationUserListInput,
  ) => Promise<TApplicationUserListResponse | null>;
  updateUser: (input: TApplicationUpdateUserInput) => Promise<TApplicationUpdateUserResponse>;
  changeUserAccess: (
    input: TApplicationChangeUserAccessInput,
  ) => Promise<TApplicationChangeUserAccessResponse>;
  resetUserPassword: (
    input: TApplicationResetUserPasswordInput,
  ) => Promise<TApplicationResetUserPasswordResponse>;
  changeUserPassword: (
    input: TApplicationChangeUserPasswordInput,
  ) => Promise<TApplicationChangeUserPasswordResponse>;
  deleteUser: (input: TApplicationDeleteUserInput) => Promise<TApplicationDeleteUserResponse>;
  updateUserRoles: (
    input: TApplicationUpdateUserRolesInput,
  ) => Promise<TApplicationUpdateUserRolesResponse>;
}

export interface ITrpcContext {
  applicationBoilService: IApplicationBoilService;
  applicationDocService: IApplicationDocService;
  applicationPlantService: IApplicationPlantService;
  applicationHistoryService: IApplicationHistoryService;
  applicationHistoryTypeService: IApplicationHistoryTypeService;
  applicationRoleService: IApplicationRoleService;
  applicationUserService: IApplicationUserService;
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
