import TraceTrademark from "src/trace_models/trace_trademark.model";
import { GetTraceTrademarksDto } from "./dto/get-trace-trademarks.dto";
export declare class TraceTrademarksService {
    private traceTrademarksRepository;
    constructor(traceTrademarksRepository: typeof TraceTrademark);
    getTrademarks(dto: GetTraceTrademarksDto): Promise<{
        total: number;
        rows: any;
    }>;
}
