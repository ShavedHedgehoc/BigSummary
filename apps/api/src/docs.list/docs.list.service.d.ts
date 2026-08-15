import { DocsService } from "src/docs/docs.service";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";
import { GetDocsDto } from "./dto/get-docs.dto";
export declare class DocsListService {
    private docsService;
    private recordsService;
    private historiesService;
    constructor(docsService: DocsService, recordsService: RecordsService, historiesService: HistoriesService);
    getDocsList(): Promise<any>;
    getDocsListWithFilter(dto: GetDocsDto): Promise<{
        rows: any;
        total: any;
    }>;
}
