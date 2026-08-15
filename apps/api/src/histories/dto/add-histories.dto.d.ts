export declare class AddHistoriesDto {
    readonly boil: string;
    readonly code: string | null;
    readonly historyType: string;
    readonly userId: number;
    readonly employeeId: number;
    readonly note: string;
}
export declare class AddHistoryDirectDto {
    readonly record_id: number;
    readonly historyType: string;
    readonly userId: number;
    readonly employeeId: number;
    readonly note: string;
}
export declare class AddHistoryDtoNew {
    readonly record_id: number;
    readonly boil_value: string;
    readonly historyType: string;
    readonly userId: number;
    readonly employeeId: number;
    readonly note: string;
    readonly code: string;
    readonly base_code: string;
    readonly history_note: string;
    readonly plant_id: number;
}
