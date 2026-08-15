import HistoryType from "./history_types.model";
import { CreateHistoryTypeDto } from "./dto/create-history-type.dto";
export declare class HistoryTypesService {
    private historyTypesRepository;
    constructor(historyTypesRepository: typeof HistoryType);
    getAllHistoryTypes(): Promise<HistoryType[]>;
    getAllBaseHistoryTypes(): Promise<HistoryType[]>;
    getAllProductHistoryTypes(): Promise<HistoryType[]>;
    getByValue(value: string): Promise<HistoryType>;
    getById(id: number): Promise<HistoryType>;
    createHistoryType(dto: CreateHistoryTypeDto): Promise<HistoryType>;
}
