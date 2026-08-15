import TraceCanState from "src/trace_models/trace_can_state.model";
export declare class TraceCanStatesService {
    private traceCanStateRepository;
    constructor(traceCanStateRepository: typeof TraceCanState);
    getCanStates(): Promise<any>;
}
