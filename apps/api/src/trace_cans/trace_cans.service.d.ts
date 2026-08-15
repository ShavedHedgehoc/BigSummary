import { TraceCanRecordsService } from "src/trace_can_records/trace_can_records.service";
import TraceCan from "src/trace_models/trace_can.model";
import { GetCansListDto } from "./dto/get-cans-list.dto";
import { TraceCanLocationsService } from "src/trace_can_locations/trace_can_locations.service";
import { GetCansDto } from "./dto/get-cans.dto";
export declare class TraceCansService {
    private traceCansRepository;
    private traceCanRecordsService;
    private traceCanLocationsService;
    constructor(traceCansRepository: typeof TraceCan, traceCanRecordsService: TraceCanRecordsService, traceCanLocationsService: TraceCanLocationsService);
    getVolumes(): Promise<any>;
    getCans(): Promise<any>;
    getCansIdsByStateTypeIds(typeArr: number[] | []): Promise<number[] | []>;
    getCansIdsByPlantIds(typeArr: number[] | []): Promise<number[] | []>;
    getCansIdsInTransit(condition: boolean): Promise<number[] | []>;
    getCansWithParams(dto: GetCansDto): Promise<any>;
    getCansList(dto: GetCansListDto): Promise<{
        total: any;
        rows: any;
    }>;
}
