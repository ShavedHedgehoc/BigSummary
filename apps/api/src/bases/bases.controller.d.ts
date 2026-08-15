import { BasesService } from "./bases.service";
import { UpdateBaseDto } from "./dto/update-base.dto";
export declare class BaseController {
    private basesService;
    constructor(basesService: BasesService);
    getCurrentDocWithParams(dto: UpdateBaseDto): Promise<void>;
}
