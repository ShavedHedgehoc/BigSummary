import { TraceLoadsService } from "./trace_loads.service";
export declare class TraceLoadsController {
    private traceLoadService;
    constructor(traceLoadService: TraceLoadsService);
    getLoadsRows(batchPK: string): Promise<any>;
}
