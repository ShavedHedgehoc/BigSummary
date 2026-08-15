export interface BaseRow {
    readonly code: string;
    readonly marking: string;
}
export declare class UpdateBaseDto {
    readonly bases: BaseRow[];
}
