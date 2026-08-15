import { Model } from "sequelize-typescript";
import Boil from "src/boils/boil.model";
import Doc from "src/docs/docs.model";
import History from "src/histories/histories.model";
import UserSettings from "src/user-settings/user-settings.model";
interface PlantsCreationsAttrs {
    value: string;
}
export default class Plant extends Model<Plant, PlantsCreationsAttrs> {
    id: number;
    value: string;
    abb: string;
    docs: Doc[];
    boils: Boil[];
    histories: History[];
    user_settings: UserSettings[];
}
export {};
