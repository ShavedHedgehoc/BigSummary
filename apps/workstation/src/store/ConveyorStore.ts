import { makeAutoObservable } from "mobx";
import { $api } from "../http";
import handleError from "../http/handleError";

export interface IConveyor {
  id: number;
  value: string;
  barcode: string;
}

export default class ConveyorStore {
  conveyor: IConveyor | null = null;
  pending: boolean = false;
  error = "";
  constructor() {
    makeAutoObservable(this);
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string) {
    this.error = error;
  }

  setConveyor(conveyor: IConveyor | null) {
    this.conveyor = conveyor;
  }

  async fetchConveyor(barcode: string) {
    try {
      this.setPending(true);
      const response = await $api.get(`/conveyors/barcode/${barcode}`);
      this.setConveyor(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError(errValue);
    } finally {
      this.setPending(false);
    }
  }

  clearConveyor() {
    this.setConveyor(null);
  }
}
