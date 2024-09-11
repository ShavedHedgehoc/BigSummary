import { makeAutoObservable } from "mobx";
import handleError from "../http/handleError";

import PlantService, { IPlant } from "../services/PlantService";

export default class PlantsStore {
  plants = {} as IPlant[];
  currentPlant = {} as IPlant;
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this);
  }

  setPlants(plants: IPlant[] | []) {
    this.plants = [...plants];
  }

  setCurrentPlants(id: number) {
    const plantById = this.plants.find((x) => x.id === id);
    if (plantById) {
      this.currentPlant = plantById;
    }
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchPlants() {
    try {
      this.setPending(true);
      const response = await PlantService.getPlants();
      this.setPlants(response.data);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }
}
