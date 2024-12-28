import { action, computed, makeAutoObservable } from "mobx";
import handleError from "../shared/api/http/handleError";
import { IHistoryType } from "../types";
import HistoryTypeService from "../services/HistoryTypeService";

export default class HistoryTypeStore {
  historyTypes = {} as IHistoryType[];
  historyTypesForBases = {} as IHistoryType[];
  currentHistoryType: null | IHistoryType = null;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {
      selectorOptions: computed,
      baseSelectorOptions: computed,
      currentHystoryTypeExists: computed,
      historyTypeDecription: action,
      fetchHistoryTypes: action,
      fetchHistoryTypesForBases: action,
    });
  }

  get selectorOptions() {
    return this.historyTypes;
  }

  get baseSelectorOptions() {
    return this.historyTypesForBases;
  }

  get currentHystoryTypeExists() {
    return this.currentHistoryType != null;
  }

  historyTypeDecription(val: string) {
    const historyType = this.historyTypes.find((historeTypeName) => historeTypeName.value === val);
    if (!historyType) {
      return null;
    }
    return historyType.description;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setCurrentHistoryType(id: number) {
    const historyPlantById = this.historyTypes.find((x) => x.id === id);
    if (historyPlantById) {
      this.currentHistoryType = historyPlantById;
    }
  }
  setHistoryTypes(historyTypes: IHistoryType[] | []) {
    this.historyTypes = [...historyTypes];
  }

  setHistoryTypesForBases(historyTypes: IHistoryType[] | []) {
    this.historyTypesForBases = [...historyTypes];
  }

  async fetchHistoryTypes() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setHistoryTypes([]);
      const response = await HistoryTypeService.getHistoryTypes();
      this.setHistoryTypes([...response.data]);
      this.setCurrentHistoryType(response.data[0].id);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await this.setPending(false);
    }
  }

  async fetchHistoryTypesForBases() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setHistoryTypesForBases([]);
      const response = await HistoryTypeService.getHistoryTypesForBases();
      this.setHistoryTypesForBases([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await this.setPending(false);
    }
  }
}
