import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLot from "./trace_lot.model";

@Table({ tableName: "Manufacturers" })
export default class TraceManufacturer extends Model {
  @PrimaryKey
  @Column
  ManufacturerPK: number;

  @Column
  ManufacturerName: string;

  @HasMany(() => TraceLot)
  lots: TraceLot[];
}
