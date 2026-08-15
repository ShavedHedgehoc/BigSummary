import Base from "./bases.model";
import { BaseRow, UpdateBaseDto } from "./dto/update-base.dto";
export declare class BasesService {
    private basesRepository;
    constructor(basesRepository: typeof Base);
    getOrCreateByCode(code: string): Promise<Base>;
    getByid(id: number): Promise<Base>;
    updateBase(row: BaseRow): Promise<void>;
    bulkUpdateBases(dto: UpdateBaseDto): Promise<void>;
}
