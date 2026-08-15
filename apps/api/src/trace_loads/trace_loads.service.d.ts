import TraceLoad from "src/trace_models/trace_loads.model";
import TraceWeighting from "src/trace_models/trace_weighting.model";
export declare class TraceLoadsService {
    private traceLoadRepository;
    constructor(traceLoadRepository: typeof TraceLoad);
    parseWeightings(w_item: TraceWeighting, l_item: TraceLoad): Promise<{
        id: any;
        product_id: any;
        product_name: any;
        quantity: any;
        container_id: any;
        container_name: any;
        lot_id: any;
        lot: any;
        trademark: any;
        user: any;
        date: Date;
    }>;
    parseWeightingsForTechnology(w_item: TraceWeighting, l_item: TraceLoad): Promise<{
        operation_code: any;
        operation_name: any;
        quantity: any;
        lot_name: any;
        temperature: any;
        user: any;
        date: Date;
    }>;
    loadResult(item: TraceLoad): Promise<any>;
    loadForTechnologyResult(item: TraceLoad): Promise<any>;
    getLoadsRows(batchPK: number): Promise<any>;
    getLoadsRowsForTechnology(batchPK: number): Promise<any>;
}
