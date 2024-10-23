import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";

@Table({ tableName: "Sellers" })
export default class TraceSeller extends Model {
  @PrimaryKey
  @Column
  SellerPK: number;

  @Column
  SellerName: string;

  @HasMany(() => TraceLot)
  lots: TraceLot[];
}
