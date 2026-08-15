interface IBoilFilter {
    startDate: string;
    endDate: string;
    plants: number[];
}
export declare class GetDocsDto {
    readonly filter: IBoilFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
