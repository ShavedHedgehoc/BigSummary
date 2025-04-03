import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceCanLocation from "./trace_can_location.model";

@Table({ tableName: "Plants" })
export default class TracePlant extends Model {
  @PrimaryKey
  @Column
  PlantPK: number;

  @Column
  PlantName: string;

  @Column
  PlantAlias: string;

  @HasMany(() => TraceCanLocation)
  locations: TraceCanLocation[];
}
