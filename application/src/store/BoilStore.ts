import { action, computed, makeAutoObservable } from "mobx";
import { IBoilsListItem } from "../types";
import handleError from "../http/handleError";
import BoilService from "../services/BoilService";

export default class BoilStore {
  pending = false;
  error = {} as string[];
  boils = {} as IBoilsListItem[] | [];
  boilPending = false;
  updateBoilId: null | number = null;

  constructor() {
    makeAutoObservable(this, {
      noRecordsFound: computed,
      renderTable: computed,
      renderLoader: computed,
      fetchBoils: action,
    });
  }

  get noRecordsFound() {
    if (this.boils.length === 0 && !this.pending) {
      return true;
    }
    return false;
  }

  get renderTable() {
    return this.boils.length > 0;
  }

  get renderLoader() {
    return this.pending;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  setBoils(boils: IBoilsListItem[] | []) {
    this.boils = [...boils];
  }

  setBoilPending(bool: boolean) {
    this.boilPending = bool;
  }

  setUpdateBoilId(boilId: number | null) {
    this.updateBoilId = boilId;
  }

  async fetchBoils() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setBoils([]);
      const response = await BoilService.getBoilsList();
      await this.setBoils(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async updateBoil(boilId: number) {
    try {
      this.setUpdateBoilId(boilId);
      this.setBoilPending(true);
      const response = await BoilService.getUpdatedBoilRow(boilId.toString());
      this.boils = this.boils.map((item) => (item.id == boilId ? response.data : item));
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
      console.log(errValue);
    } finally {
      this.setBoilPending(false);
      this.setUpdateBoilId(null);
    }
  }
}
