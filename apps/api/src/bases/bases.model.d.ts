import { Model } from "sequelize-typescript";
import Boil from "src/boils/boil.model";
interface BasesCreationsAttrs {
    code: string;
    marking: string;
}
export default class Base extends Model<Base, BasesCreationsAttrs> {
    id: number;
    code: string;
    marking: string;
    boil: Boil;
}
export {};
