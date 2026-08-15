interface ITraceBatchsFilter {
    batch: string;
    marking: string;
    startDate: string;
    endDate: string;
    month: string;
    year: string;
    plants: string[] | [];
}
export declare class GetTraceBatchsDto {
    readonly filter: ITraceBatchsFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
