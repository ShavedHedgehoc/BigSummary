import { TraceWeightingsService } from "./trace_weightings.service";
export declare class TraceWeightingsController {
    private traceWeightingService;
    constructor(traceWeightingService: TraceWeightingsService);
    getWeightingsRows(batchPK: string): Promise<{
        id: number;
        product_id: number;
        product_name: string;
        quantity: number;
        container_id: number;
        container_name: string;
        lot_id: number;
        lot: string;
        trademark: string;
        user: string;
        date: Date;
    }[]>;
}
