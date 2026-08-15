import { TraceTechnologyService } from "./trace_technology.service";
export declare class TraceTechnologyController {
    private traceTechnologyService;
    constructor(traceTechnologyService: TraceTechnologyService);
    getWeightingsRows(batchPK: string): Promise<any[]>;
}
