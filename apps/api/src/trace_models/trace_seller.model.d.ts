import { Model } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";
export default class TraceSeller extends Model {
    SellerPK: number;
    SellerName: string;
    lots: TraceLot[];
}
