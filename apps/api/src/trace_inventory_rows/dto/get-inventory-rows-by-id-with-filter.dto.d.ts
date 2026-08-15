export interface GetInventoryRowsFilter {
    readonly productCode: string;
    readonly dayToExpire: number;
    readonly toFilter: boolean;
}
export declare class GetInventoryRowsByIdWithFilterDto {
    readonly inventoryId: number;
    readonly filter: GetInventoryRowsFilter;
}
