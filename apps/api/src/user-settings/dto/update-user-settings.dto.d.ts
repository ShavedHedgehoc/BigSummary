interface UserSettings {
    plant_id: number;
}
export declare class UpdateUserSettingsDto {
    readonly user_id: number;
    readonly user_settings: UserSettings;
}
export {};
