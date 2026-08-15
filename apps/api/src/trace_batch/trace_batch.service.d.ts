import TraceBatch from "../trace_models/trace_batch.model";
import { GetTraceBatchsDto } from "./dto/get-trace-batchs.dto";
import { GetTraceBatchsWghtReportDto } from "./dto/get-trace-batchs-wght-report.dto";
import { GetTraceBatchsWghtReportDetailDto } from "./dto/get-batchs-wght-report-detail.dto";
import { GetWeightingsSummaryDto } from "./dto/get-weightings-summary.dto";
import { GetWeightingsSummaryDetailDto } from "./dto/get-weightings-summary-detail.dto";
export interface TraceBatchByIdResp {
}
export declare class TraceBatchService {
    private traceBatchRepository;
    constructor(traceBatchRepository: typeof TraceBatch);
    getByName(batchName: string): Promise<TraceBatch>;
    getById(id: number): Promise<any>;
    getBatchs(dto: GetTraceBatchsDto): Promise<{
        total: number;
        rows: object[];
    }>;
    getBatchData(id: number): Promise<{
        summary_data: object[];
    }>;
    getBatchsWghtReport(dto: GetTraceBatchsWghtReportDto): Promise<{
        total: number;
        rows: object[];
    }>;
    getBatchsWghtReportDetail(dto: GetTraceBatchsWghtReportDetailDto): Promise<object[]>;
    deleteWeightingsByContainerId(conatinerId: number): Promise<void>;
    getWeightingDepartmentSummary(dto: GetWeightingsSummaryDto): Promise<object[]>;
    getWeightingsDepartmentsSummaryDetail(dto: GetWeightingsSummaryDetailDto): Promise<{
        total: number;
        rows: object[];
    }>;
}
