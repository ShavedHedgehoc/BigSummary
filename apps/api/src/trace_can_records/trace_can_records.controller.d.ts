import { TraceCanRecordsService } from "./trace_can_records.service";
export declare class TraceCanRecordsController {
    private traceRecordsService;
    constructor(traceRecordsService: TraceCanRecordsService);
    getLastTenRecords(id: number): Promise<any>;
}
