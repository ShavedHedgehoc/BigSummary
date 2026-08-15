import TraceCanRecord from "src/trace_models/trace_can_record.model";
export declare class TraceCanRecordsService {
    private traceCanRecordsRepository;
    constructor(traceCanRecordsRepository: typeof TraceCanRecord);
    getLastStateById(id: number): Promise<any>;
    getLastTenRecordsById(id: number): Promise<any>;
}
