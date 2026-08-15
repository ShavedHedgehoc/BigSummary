import { Model } from "sequelize-typescript";
import User from "src/users/users.model";
import Plant from "src/plants/plant.model";
interface UserSettingsCreationsAttrs {
    user_id: number;
    plant_id: number;
}
export default class UserSettings extends Model<UserSettings, UserSettingsCreationsAttrs> {
    id: number;
    user_id: number;
    plant_id: number;
    user: User;
    plant: Plant;
}
export {};
