import { TraceInventoryRowsService } from "./trace_inventory_rows.service";
import { GetInventoryRowsByIdWithFilterDto } from "./dto/get-inventory-rows-by-id-with-filter.dto";
export declare class TraceInventoryRowsController {
    private inventoryRowsService;
    constructor(inventoryRowsService: TraceInventoryRowsService);
    getInventoryRowsByIdWithFilter(dto: GetInventoryRowsByIdWithFilterDto): Promise<any>;
}
