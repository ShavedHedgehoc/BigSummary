import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";
export declare class TestService {
    private recordsService;
    private historiesService;
    constructor(recordsService: RecordsService, historiesService: HistoriesService);
    getRecordDetail(id: number): Promise<any>;
}
