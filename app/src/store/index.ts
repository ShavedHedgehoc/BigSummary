import AuthStore from "./AuthStore";
import PlantsStore from "./PlantStore";
import SummaryStore from "./SummaryStore";
import HistoryStore from "./HistoryStore";

export default class RootStore {
  AuthStore;
  SummaryStore;
  PlantStore;
  HistoryStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.SummaryStore = new SummaryStore();
    this.PlantStore = new PlantsStore();
    this.HistoryStore = new HistoryStore();
  }
}