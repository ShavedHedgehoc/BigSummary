import { TraceLoadsService } from "src/trace_loads/trace_loads.service";
import TraceBoilRecord from "src/trace_models/trace_boil_record.model";
export declare class TraceTechnologyService {
    private traceBoilRecordRepository;
    private traceLoadService;
    constructor(traceBoilRecordRepository: typeof TraceBoilRecord, traceLoadService: TraceLoadsService);
    technologyResult(item: TraceBoilRecord): Promise<{
        operation_code: any;
        operation_name: any;
        quantity: any;
        lot_name: any;
        temperature: any;
        user: any;
        date: Date;
    }>;
    getTechnologyRows(batchPK: number): Promise<any>;
    getBoilCard(batchPK: number): Promise<any[]>;
}
