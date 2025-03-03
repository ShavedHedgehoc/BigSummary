import axios from "axios";

export interface ITraceCanState {
  CanStatePK: number;
  CanStateName: string;
  CanStateDescription: string;
  isBaseState: boolean;
}

export default class TraceCanStatesService {
  static async getCanStates(): Promise<ITraceCanState[]> {
    const res = await axios.get(`/api/trace-can-states`);
    return res.data;
  }
}
