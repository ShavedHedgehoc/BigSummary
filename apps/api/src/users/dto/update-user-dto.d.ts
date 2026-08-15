interface UserSettings {
    plant_id: number;
}
export declare class UpdateUserDto {
    readonly user_id: number;
    readonly name: string;
    readonly email: string;
    readonly user_settings: UserSettings | null;
}
export {};
