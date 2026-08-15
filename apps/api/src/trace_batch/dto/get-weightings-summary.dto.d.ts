interface ITraceWeightingsSummaryFilter {
    startDate: string;
    endDate: string;
    author: string;
    plants: string[] | [];
}
export declare class GetWeightingsSummaryDto {
    readonly filter: ITraceWeightingsSummaryFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
