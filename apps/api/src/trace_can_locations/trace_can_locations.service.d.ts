import TraceCanLocation from "src/trace_models/trace_can_location.model";
export declare class TraceCanLocationsService {
    private traceCanLocationsRepository;
    constructor(traceCanLocationsRepository: typeof TraceCanLocation);
    getLastLocationByCanId(id: number): Promise<any>;
}
