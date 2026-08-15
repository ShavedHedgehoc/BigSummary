import User from "src/users/users.model";
export interface IUserSettings {
    plant_id: number;
}
export interface IUserData {
    id: number;
    name: string;
    email: string;
    roles: string[];
    settings: IUserSettings;
}
export declare const toRegisteredUserData: (user: User) => IUserData;
