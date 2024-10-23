import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";

@Table({ tableName: "ManufacturerLots" })
export default class TraceManufacturerLot extends Model {
  @PrimaryKey
  @Column
  ManufacturerLotPK: number;

  @Column
  ManufacturerLotName: string;

  @HasMany(() => TraceLot)
  lots: TraceLot[];
}
