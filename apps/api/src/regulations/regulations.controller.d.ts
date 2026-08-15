import { RegulationsService } from "./regulations.service";
import { BulkUpdateRegulationsDto } from "./dto/bulk-update-regulation.dto";
import Regulation from "./regulations.model";
export declare class RegulationsController {
    private regulationsService;
    constructor(regulationsService: RegulationsService);
    bulkUpsert(dto: BulkUpdateRegulationsDto[]): Promise<void>;
    getRecordsById(id: string): Promise<Regulation>;
}
