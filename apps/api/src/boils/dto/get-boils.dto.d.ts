interface IBoilFilter {
    baseCode: string;
    boil: string;
    marking: string;
    haveRecord: boolean;
    boilAsc: boolean;
    states: number[];
    plants: number[];
}
export declare class GetBoilsDto {
    readonly filter: IBoilFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
