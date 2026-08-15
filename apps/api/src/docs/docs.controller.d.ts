import { DocsService } from "./docs.service";
import Doc from "./docs.model";
import { CreateDocDto } from "./dto/create-doc.dto";
import { GetDocsDto } from "./dto/get-docs.dto";
export declare class DocsController {
    private docsService;
    constructor(docsService: DocsService);
    getAll(): Promise<Doc[]>;
    getCurrentDoc(id: string): Promise<void>;
    getAllWithParams(dto: GetDocsDto): Promise<{
        total: number;
        rows: Doc[];
    }>;
    getDocByid(docId: string): Promise<Doc>;
    create(dto: CreateDocDto): Promise<Doc>;
}
