import { TraceCanStatesService } from "./trace_can_states.service";
export declare class TraceCanStatesController {
    private traceCanStatesService;
    constructor(traceCanStatesService: TraceCanStatesService);
    getAllStates(): Promise<any>;
}
