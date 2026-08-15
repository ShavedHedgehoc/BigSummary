export interface parsedSemiProduct {
    code: string;
    boil: string;
    marking: string;
}
export declare function parseSemiproducts(value: string): parsedSemiProduct[] | [];
