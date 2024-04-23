import SummaryStore from "./SummaryStore";
export default class RootStore {
  SummaryStore;

  constructor() {
    this.SummaryStore = new SummaryStore();
  }
}
