import TraceWeighting from "../trace_models/trace_weighting.model";
export declare class TraceWeightingsService {
    private traceWeightingRepository;
    constructor(traceWeightingRepository: typeof TraceWeighting);
    weightingResult(item: TraceWeighting): Promise<{
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
    }>;
    getWeightingsRows(batchPK: number): Promise<{
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
