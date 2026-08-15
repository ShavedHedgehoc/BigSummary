import { TraceTrademarksService } from "./trace_trademarks.service";
import { GetTraceTrademarksDto } from "./dto/get-trace-trademarks.dto";
export declare class TraceTrademarksController {
    private traceTrademarksService;
    constructor(traceTrademarksService: TraceTrademarksService);
    getInventories(dto: GetTraceTrademarksDto): Promise<{
        total: number;
        rows: any;
    }>;
}
