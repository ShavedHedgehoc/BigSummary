import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";

@Table({ tableName: "Trademarks" })
export default class TraceTrademark extends Model {
  @PrimaryKey
  @Column
  TRademarkPK: number;

  @Column
  TrademarkName: string;

  @HasMany(() => TraceLot)
  lots: TraceLot[];
}
