import { DocsListService } from "./docs.list.service";
import { GetDocsDto } from "./dto/get-docs.dto";
export declare class DocsListController {
    private docsListService;
    constructor(docsListService: DocsListService);
    getAll(): Promise<any>;
    getAllWithParams(dto: GetDocsDto): Promise<{
        rows: any;
        total: any;
    }>;
}
