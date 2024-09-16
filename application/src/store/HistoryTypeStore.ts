import { computed, makeAutoObservable } from "mobx";
import handleError from "../http/handleError";
import { IHistoryType } from "../types";
import HistoryTypeService from "../services/HistoryTypeService";

export default class HistoryTypeStore {
  historyTypes = {} as IHistoryType[];
  currentHistoryType: null | IHistoryType = null;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, { selectorOptions: computed, currentHystoryTypeExists: computed });
  }

  get selectorOptions() {
    return this.historyTypes;
  }

  get currentHystoryTypeExists() {
    return this.currentHistoryType != null;
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

  async fetchHistoryTypes() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setHistoryTypes([]);
      const response = await HistoryTypeService.getHistories();
      await this.setHistoryTypes([...response.data]);
      await this.setCurrentHistoryType(response.data[0].id);
    } catch (error) {
      const errValue = handleError(error);
      await this.setError([...errValue]);
    } finally {
      await this.setPending(false);
    }
  }
}
