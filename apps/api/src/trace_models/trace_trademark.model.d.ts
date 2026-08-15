import { Model } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";
export default class TraceTrademark extends Model {
    TRademarkPK: number;
    TrademarkName: string;
    lots: TraceLot[];
}
