import { Model } from "sequelize-typescript";
import History from "src/histories/histories.model";
interface HistoryTypesCreationsAttrs {
    value: string;
}
export default class HistoryType extends Model<HistoryType, HistoryTypesCreationsAttrs> {
    id: number;
    value: string;
    description: string;
    for_boil: boolean;
    hystorys: History[];
}
export {};
