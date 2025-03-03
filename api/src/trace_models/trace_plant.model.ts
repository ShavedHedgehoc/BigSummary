import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
// import TraceCan from "./trace_can.model";
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

  // @HasMany(() => TraceCan)
  // cans: TraceCan[];

  @HasMany(() => TraceCanLocation)
  locations: TraceCanLocation[];
}
