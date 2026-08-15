import { Model } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";
export default class TraceManufacturer extends Model {
    ManufacturerPK: number;
    ManufacturerName: string;
    lots: TraceLot[];
}
