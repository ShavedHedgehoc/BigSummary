import { TraceCansService } from "./trace_cans.service";
import { GetCansListDto } from "./dto/get-cans-list.dto";
import { GetCansDto } from "./dto/get-cans.dto";
export declare class TraceCansController {
    private cansService;
    constructor(cansService: TraceCansService);
    getCans(): Promise<any>;
    getCanVolumes(): Promise<any>;
    getCansWithParams(dto: GetCansDto): Promise<any>;
    getCansList(dto: GetCansListDto): Promise<{
        total: any;
        rows: any;
    }>;
}
