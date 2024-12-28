interface TheadProperties {
  width: number;
  align?: CanvasTextAlign;
  padding?: string;
  value: string;
}

interface IHistory {
  id: number;
  record_id: number;
  boil_id: number;
  historyTypeId: number;
  userId: number;
  employeeId: number;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  historyType: IHistoryType;
  user: IUser | null;
  employee: IEmployee | null;
  note_id: number;
}
interface IOccupation {
  id: number;
  value: string;
  description: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  roles: string[];
}

interface IHistoryType {
  id: number;
  value: string;
  description: string;
}

interface IEmployee {
  id: number;
  name: string;
  barcode: string;
  occupation: IOccupation;
}

interface IPlant {
  id: number;
  value: string;
  abb: string;
}

interface IRole {
  id: number;
  value: string;
  description: string;
}

interface IDocRow {
  id: number;
  productId: number;
  product: string;
  boil: string;
  plan: number;
  apparatus: string;
  bbf: string;
  note: string;
  can: string;
  conveyor: string;
  workshop: string;
  historiesCount: number;
  state: string;
  stateValue: string;
  isSet: boolean;
}

interface AddHistoryDto {
  record_id: number | null;
  historyType: string | null;
  boil_value: string | null;
  userId: number | null;
  employeeId: number | null;
  note: string | null;
  history_note: string | null;
}

interface FetchBoilsFilter {
  boil: string;
  baseCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plants: number[] | [];
}

interface FetchEmployeesFilter {
  name: string;
  nameAsc: boolean;
  occupations: number[] | [];
}

interface FetchUsersFilter {
  name: string;
  nameAsc: boolean;
  email: string;
  banned: number[] | [];
  roles: number[] | [];
}

interface FetchUsersDto {
  filter: FetchUsersFilter;
  page: number;
  limit: number;
}

interface FetchUsersFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface FetchDocumentsFilter {
  startDate: string;
  endDate: string;
  plants: number[] | [];
}

interface FetchDocumentsFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface FetchDocumentsDto {
  filter: FetchDocumentsFilter;
  page: number;
  limit: number;
}

interface IDocumentRow {
  id: number;
  date: Date;
  plant: string;
  recordsCount: number;
  historiesCount: number;
}

interface IDocumentData {
  rows: IDocumentRow[];
  total: number;
}

interface FetchProductFilter {
  boil: string;
  productCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plant: number | null;
  conveyor: string;
}

interface FetchBoilsDto {
  filter: FetchBoilsFilter;
  page: number;
  limit: number;
}

interface FetchEmployeesDto {
  filter: FetchEmployeesFilter;
  page: number;
  limit: number;
}

interface FetchProductsDto {
  filter: FetchProductFilter;
}

interface FetchBoilsFilterFormField {
  key: string;
  value: string;
  values?: number[];
}

interface IBoilData {
  rows: IBoilRow[];
  total: number;
}

interface IBoilRow {
  id: number;
  value: string;
  recordsCount: number;
  historiesCount: number;
  state: string;
  state_id: number;
  stateValue: string;
  base_code: string;
  base_marking: string;
  plant: string;
}

interface IConveyor {
  id: number;
  value: string;
  barcode: string;
}

interface IConveyorUpdateDto {
  id: number;
  value: string;
  barcode: string | null;
}

interface BaseRow {
  code: string;
  marking: string;
}

interface BulkUpdateBasesDto {
  bases: BaseRow[];
}

interface PaginationStore {
  page: number;
  limit: number;
  total: number;
  increasePage: () => void;
  decreasePage: () => void;
  setTotal: (val: number) => void;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
}

interface IDocRow {
  id: number;
  productId: number;
  product: string;
  boil: string;
  plan: number;
  apparatus: string;
  bbf: string;
  note: string;
  can: string;
  conveyor: string;
  workshop: string;
  historiesCount: number;
  state: string;
  stateValue: string;
  stateTime: Date;
  isSet: boolean;
  isUpdated: boolean;
}

interface SummaryResponse {
  id: number;
  plantId: number;
  plant: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  records: IDocRow[];
}

type CustomColorsVariants = "success" | "danger" | "warning" | "primary";
