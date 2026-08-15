import { CreateDocDto } from "./dto/create-doc.dto";
import { PlantsService } from "src/plants/plants.service";
import Doc from "./docs.model";
import { GetDocsDto } from "src/docs.list/dto/get-docs.dto";
export declare class DocsService {
    private docRepository;
    private plantService;
    constructor(docRepository: typeof Doc, plantService: PlantsService);
    getCurrentDocByPlantId(plantId: number): Promise<Doc>;
    getTomorrowDocByPlantId(plantId: number): Promise<Doc>;
    getAllDocsWithFilter(dto: GetDocsDto): Promise<{
        total: number;
        rows: Doc[];
    }>;
    getDocByPlantAndDate(date: string, plantId: number): Promise<Doc>;
    getDocById(id: number): Promise<Doc>;
    getAllDocs(): Promise<Doc[]>;
    createDoc(dto: CreateDocDto): Promise<Doc>;
    deleteDoc(id: number): Promise<void>;
}
