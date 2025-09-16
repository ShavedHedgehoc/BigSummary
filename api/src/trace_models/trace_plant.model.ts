import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceCanLocation from "./trace_can_location.model";
import TraceInventoryDoc from "./trace_inventory_doc.model";

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

  @HasMany(() => TraceInventoryDoc)
  inventory_docs: TraceInventoryDoc[];
}
