import { Model } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";
export default class TraceManufacturerLot extends Model {
    ManufacturerLotPK: number;
    ManufacturerLotName: string;
    lots: TraceLot[];
}
