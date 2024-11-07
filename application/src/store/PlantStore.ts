import { computed, makeAutoObservable } from "mobx";
import handleError from "../shared/api/http/handleError";

import PlantService from "../services/PlantService";
import { IPlant } from "../types";

export default class PlantsStore {
  plants = {} as IPlant[];
  currentPlant: null | IPlant = null;
  pending = false;
  pendingComplete = false;
  plantError = {} as string[];

  constructor() {
    makeAutoObservable(this, { currentPlantExists: computed, selectorOptions: computed });
  }

  get currentPlantExists() {
    return this.currentPlant != null;
  }

  get selectorOptions() {
    return this.plants;
  }

  setPlants(plants: IPlant[] | []) {
    this.plants = [...plants];
  }

  setCurrentPlant(id: number) {
    const plantById = this.plants.find((x) => x.id === id);
    if (plantById) {
      this.currentPlant = plantById;
    }
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setPendingComplete(bool: boolean) {
    this.pendingComplete = bool;
  }

  setError(error: string[]) {
    this.plantError = error;
  }

  async fetchPlants() {
    try {
      this.setPending(true);
      this.setPendingComplete(false);
      const response = await PlantService.getPlants();
      await this.setPlants(response.data);
      await this.setCurrentPlant(response.data[0].id);
      this.setPendingComplete(true);
    } catch (error) {
      console.log("error");
      const errValue = handleError(error);
      this.setError([...errValue]);
      this.setPlants({} as IPlant[]);
    } finally {
      this.setPending(false);
    }
  }
}
