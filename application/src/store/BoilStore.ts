import { action, computed, makeAutoObservable } from "mobx";
import handleError from "../shared/api/http/handleError";
import BoilService from "../services/BoilService";
import { perPageValues } from "../components/tables/PaginationComponent";

export interface BoilState {
  data: IBoilData;
  pending: boolean;
  error: string[];
  page: number;
  limit: number;
  filter: IBoilFilter;
  updateRowId: null | number;
  rowPending: boolean;
}

export interface IBoilData {
  rows: IBoilRow[];
  total: number;
}

export interface IBoilRow {
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

export interface IBoilFilter {
  boil: string;
  baseCode: string;
  marking: string;
  haveRecord: boolean;
  boilAsc: boolean;
  states: number[] | [];
  plants: number[] | [];
  // date: string;
  // month: string;
  // year: string;
  // plant: string;
}

export interface IBoilFetchDto {
  filter: IBoilFilter;
  page: number;
  limit: number;
}

const initFilter: IBoilFilter = {
  baseCode: "",
  boil: "",
  marking: "",
  haveRecord: true,
  boilAsc: false,
  states: [],
  plants: [],
};

const initData: IBoilData = {
  rows: [],
  total: 0,
};

const initBoilState: BoilState = {
  data: initData,
  pending: false,
  error: [],
  page: 1,
  limit: perPageValues[0],
  filter: initFilter,
  updateRowId: null,
  rowPending: false,
  // init: boolean;
};

export enum BoilFilterParams {
  BOIL = "boil",
  MARKING = "marking",
  BASE = "baseCode",
  HAVE_RECORD = "haveRecord",
  BOIL_ASC = "boilAsc",
  STATES = "states",

  // DATE = "date",
  // MONTH = "month",
  // YEAR = "year",
  PLANTS = "plant",
}

export interface IBoilFormField {
  key: string;
  value: string;
  values?: number[];
}

export default class BoilStore {
  state: BoilState = initBoilState;

  constructor() {
    makeAutoObservable(this, {
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      page: computed,
      pages: computed,
      firstRecord: computed,
      lastRecord: computed,
      dto: computed,
      clearFilterDisabled: computed,
      boil: computed,
      fetchBoils: action,
      nextPage: action,
      prevPage: action,
      lastPage: action,
      firstPage: action,
      changeLimit: action,
      changeFilter: action,
      clearFilter: action,
      clearStates: action,
      clearPlants: action,
    });
  }

  get noRecordsFound() {
    return this.state.data.rows.length === 0 && !this.state.pending;
  }

  get renderTable() {
    return this.state.data.rows.length > 0 && !this.state.pending;
  }

  get renderLoader() {
    return this.state.pending;
  }
  get page() {
    return this.state.page;
  }
  get pages() {
    return Math.ceil(this.state.data.total / this.state.limit);
  }

  get firstRecord(): number {
    if (this.state.data.total === 0) {
      return 0;
    }
    return 1 + (this.state.page - 1) * this.state.limit;
  }
  get lastRecord(): number {
    return this.state.page * this.state.limit > this.state.data.total
      ? this.state.data.total
      : this.state.page * this.state.limit;
  }

  get dto(): IBoilFetchDto {
    return { filter: this.state.filter, page: this.state.page, limit: this.state.limit };
  }

  get clearFilterDisabled() {
    return JSON.stringify(this.state.filter) === JSON.stringify(initFilter);
  }
  get boil() {
    return this.state.filter.boil;
  }

  setPending(bool: boolean) {
    this.state.pending = bool;
  }

  setError(error: string[]) {
    this.state.error = error;
  }

  setData(data: IBoilData) {
    this.state = { ...this.state, data: { rows: data.rows, total: data.total } };
  }

  setPage(num: number) {
    this.state = { ...this.state, page: num };
  }

  setLimit(num: number) {
    this.state = { ...this.state, limit: num };
  }

  increasePage() {
    this.state.page = this.state.page + 1;
  }

  decreasePage() {
    this.state.page = this.state.page - 1;
  }

  // purgeRows() {
  //   this.state = { ...this.state, data: { total: this.state.data.total, rows: [] } };
  // }

  setRowPending(bool: boolean) {
    this.state.rowPending = bool;
  }

  setUpdateRowId(rowId: number | null) {
    this.state.updateRowId = rowId;
  }

  clearFilter() {
    this.state.filter = initFilter;
  }

  async fetchBoils() {
    try {
      this.setError([]);
      this.setPending(true);
      const response = await BoilService.getBoilsListWithParams(this.dto);
      this.setData(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      this.setPending(false);
    }
  }

  async nextPage() {
    this.increasePage();
    this.fetchBoils();
  }

  async prevPage() {
    this.decreasePage();
    this.fetchBoils();
  }

  async firstPage() {
    this.setPage(1);
    this.fetchBoils();
  }
  async lastPage() {
    this.setPage(this.pages);
    this.fetchBoils();
  }

  async changeLimit(num: number) {
    this.setLimit(num);
    this.setPage(1);
    this.fetchBoils();
  }

  async clearStates() {
    this.state = {
      ...this.state,
      filter: {
        ...this.state.filter,
        states: [],
      },
      page: 1,
    };
  }

  async clearPlants() {
    this.state = {
      ...this.state,
      filter: {
        ...this.state.filter,
        plants: [],
      },
      page: 1,
    };
  }

  async changeFilter({ key, value, values }: IBoilFormField) {
    console.log(key);
    switch (key) {
      case BoilFilterParams.BOIL:
        this.state = { ...this.state, filter: { ...this.state.filter, boil: value }, page: 1 };
        break;
      case BoilFilterParams.BASE:
        this.state = { ...this.state, filter: { ...this.state.filter, baseCode: value }, page: 1 };
        break;
      case BoilFilterParams.MARKING:
        this.state = { ...this.state, filter: { ...this.state.filter, marking: value }, page: 1 };
        break;
      case BoilFilterParams.HAVE_RECORD:
        this.state = {
          ...this.state,
          filter: { ...this.state.filter, haveRecord: value === "true" ? true : false },
          page: 1,
        };
        break;
      case BoilFilterParams.BOIL_ASC:
        this.state = {
          ...this.state,
          filter: { ...this.state.filter, boilAsc: value === "true" ? true : false },
          page: 1,
        };
        break;
      case BoilFilterParams.STATES:
        this.state = {
          ...this.state,
          filter: {
            ...this.state.filter,
            states: values?.length ? [...values] : [...this.state.filter.states],
          },
          page: 1,
        };
        break;

      case BoilFilterParams.PLANTS:
        this.state = {
          ...this.state,
          filter: {
            ...this.state.filter,
            plants: values?.length ? [...values] : [...this.state.filter.plants],
          },
          page: 1,
        };
        break;

      default:
        break;
    }
  }

  async updateBoil(rowId: number) {
    try {
      this.setUpdateRowId(rowId);
      this.setRowPending(true);
      const response = await BoilService.getUpdatedBoilRow(rowId.toString());
      this.state = {
        ...this.state,
        data: {
          total: this.state.data.total,
          rows: this.state.data.rows.map((item) => (item.id == rowId ? response.data : item)),
        },
      };
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      await new Promise((r) => setTimeout(r, 500));
      this.setRowPending(false);
      this.setUpdateRowId(null);
      await new Promise((r) => setTimeout(r, 300));
      await this.fetchBoils();
    }
  }
}
