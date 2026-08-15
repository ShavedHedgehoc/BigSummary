import { Model } from "sequelize-typescript";
import Record from "src/records/records.model";
interface ConveyorsCreationsAttrs {
    value: string;
}
export default class Conveyor extends Model<Conveyor, ConveyorsCreationsAttrs> {
    id: number;
    value: string;
    barcode: string;
    records: Record[];
}
export {};
