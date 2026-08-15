import TraceInventoryDoc from "src/trace_models/trace_inventory_doc.model";
import { GetInventoryDocsDto } from "./dto/get-inventory-docs.dto";
export declare class TraceInventoryDocsService {
    private InventoryDocsRepository;
    constructor(InventoryDocsRepository: typeof TraceInventoryDoc);
    getInventoryById(id: number): Promise<any>;
    getInventoryDocs(dto: GetInventoryDocsDto): Promise<{
        total: any;
        rows: any;
    }>;
}
