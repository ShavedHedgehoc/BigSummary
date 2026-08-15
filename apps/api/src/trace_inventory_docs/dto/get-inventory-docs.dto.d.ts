interface IInventoryDocsFilter {
    startDate: string;
    endDate: string;
    plants: number[];
}
export declare class GetInventoryDocsDto {
    readonly filter: IInventoryDocsFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
