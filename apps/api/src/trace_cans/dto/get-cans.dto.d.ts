interface FetchCansFilter {
    can: string;
    states: number[] | [];
    volumes: number[] | [];
    plants: number[] | [];
    transit: boolean;
}
export declare class GetCansDto {
    readonly filter: FetchCansFilter;
}
export {};
