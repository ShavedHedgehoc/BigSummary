interface ITrademarkFilter {
    trademark: string;
    product_code: string;
    product_name: string;
}
export declare class GetTraceTrademarksDto {
    readonly filter: ITrademarkFilter;
    readonly limit: number;
    readonly page: number;
}
export {};
