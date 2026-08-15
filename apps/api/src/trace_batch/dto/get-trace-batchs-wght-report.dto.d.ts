interface ITraceBatchsWghtReportFilter {
    batchName: string;
    productId: string;
    startDate: string;
    endDate: string;
    compare: boolean;
    sortByBatch: boolean;
    plants: string[] | [];
}
export declare class GetTraceBatchsWghtReportDto {
    readonly filter: ITraceBatchsWghtReportFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
