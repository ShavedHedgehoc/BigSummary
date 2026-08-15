import RecordRegulation from "./record_regulations.model";
import { CreateRecordRegulationDto } from "./dto/create-record-regulation.dto";
export declare class RecordRegulationsService {
    private recordRegulationRepository;
    constructor(recordRegulationRepository: typeof RecordRegulation);
    createRecordRegulation(dto: CreateRecordRegulationDto): Promise<RecordRegulation>;
    getByRecordId(id: number): Promise<RecordRegulation>;
}
