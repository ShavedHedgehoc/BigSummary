import TraceInventoryRow from "src/trace_models/trace_inventory_row.model";
import { GetInventoryRowsByIdWithFilterDto } from "./dto/get-inventory-rows-by-id-with-filter.dto";
export declare class TraceInventoryRowsService {
    private inventoryRowsRepository;
    constructor(inventoryRowsRepository: typeof TraceInventoryRow);
    getInventoryByIdWithFilter(dto: GetInventoryRowsByIdWithFilterDto): Promise<any>;
}
