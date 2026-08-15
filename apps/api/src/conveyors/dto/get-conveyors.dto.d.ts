interface IConveyorFilter {
    value: string;
    valueAsc: boolean;
    onlyEmptyBarcode: boolean;
}
export declare class GetConveyorsDto {
    readonly filter: IConveyorFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
