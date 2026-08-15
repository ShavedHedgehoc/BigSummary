import { UploadBoilDto } from "./dto/upload-boil-dto";
import { TraceDirectConnectionService } from "./trace_direct_connection.service";
export declare class TraceDirectConnectionController {
    private traceDirectConnectionlService;
    constructor(traceDirectConnectionlService: TraceDirectConnectionService);
    UploadBoil(dto: UploadBoilDto): Promise<{
        value: any;
    }>;
}
