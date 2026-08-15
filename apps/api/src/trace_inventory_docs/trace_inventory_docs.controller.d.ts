import { TraceInventoryDocsService } from "./trace_inventory_docs.service";
import { GetInventoryDocsDto } from "./dto/get-inventory-docs.dto";
export declare class TraceInventoryDocsController {
    private traceInventoryDocsService;
    constructor(traceInventoryDocsService: TraceInventoryDocsService);
    getInventories(dto: GetInventoryDocsDto): Promise<{
        total: any;
        rows: any;
    }>;
    getInventoryByid(inventory_id: string): Promise<any>;
}
