import { HistoryTypesService } from "./history_types.service";
import HistoryType from "./history_types.model";
import { CreateHistoryTypeDto } from "./dto/create-history-type.dto";
export declare class HistoryTypesController {
    private historyTypesService;
    constructor(historyTypesService: HistoryTypesService);
    getAll(): Promise<HistoryType[]>;
    getAllForBases(): Promise<HistoryType[]>;
    getAllForProducts(): Promise<HistoryType[]>;
    create(dto: CreateHistoryTypeDto): Promise<HistoryType>;
}
