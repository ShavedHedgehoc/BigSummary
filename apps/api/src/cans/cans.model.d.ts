import { Model } from "sequelize-typescript";
import Record from "src/records/records.model";
interface CansCreationsAttrs {
    value: string;
}
export default class Can extends Model<Can, CansCreationsAttrs> {
    id: number;
    value: string;
    records: Record[];
}
export {};
