import { $api } from "../http";

export interface ITraceCanState {
  CanStatePK: number;
  CanStateName: string;
  CanStateDescription: string;
  isBaseState: boolean;
}

export default class TraceCanStatesService {
  static async getCanStates(): Promise<ITraceCanState[]> {
    const res = await $api.get(`trace-can-states`);
    return res.data;
  }
}
