import AuthStore from "./AuthStore";
import HistoryStore from "./HistoryStore";
import PlantStore from "./PlantStore";
import RecordStore from "./RecordStore";
import SummaryStore from "./SummaryStore";
export default class RootStore {
  AuthStore;
  PlantStore;
  SummaryStore;
  RecordStore;
  HistoryStore;

  constructor() {
    this.AuthStore = new AuthStore();
    this.PlantStore = new PlantStore();
    this.SummaryStore = new SummaryStore();
    this.RecordStore = new RecordStore();
    this.HistoryStore = new HistoryStore();
  }
}
