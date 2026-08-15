import { TraceBatchService } from "./trace_batch.service";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";
import { GetTraceBatchsWghtReportDetailDto } from "./dto/get-batchs-wght-report-detail.dto";
import { GetWeightingsSummaryDto } from "./dto/get-weightings-summary.dto";
import { GetWeightingsSummaryDetailDto } from "./dto/get-weightings-summary-detail.dto";
export declare class TraceBatchController {
    private traceBatchService;
    constructor(traceBatchService: TraceBatchService);
    getTraceBatchByName(batchName: string): Promise<import("../trace_models/trace_batch.model").default>;
    getTraceBatchByid(id: string): Promise<any>;
    getBatchesWithFilter(dto: GetTraceBatchsDto): Promise<{
        total: number;
        rows: object[];
    }>;
    getWghtReport(dto: GetTraceBatchsWghtReportDto): Promise<{
        total: number;
        rows: object[];
    }>;
    getWghtReportDetail(dto: GetTraceBatchsWghtReportDetailDto): Promise<object[]>;
    getBatchВфефByid(id: string): Promise<{
        summary_data: object[];
    }>;
    deleteConveyorById(id: string): Promise<void>;
    getWeightingDepartmentSummary(dto: GetWeightingsSummaryDto): Promise<object[]>;
    getWeightingDepartmentSummaryDetail(dto: GetWeightingsSummaryDetailDto): Promise<{
        total: number;
        rows: object[];
    }>;
}
