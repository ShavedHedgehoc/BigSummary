import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TracePlant from "./trace_plant.model";
import TraceInventoryRow from "./trace_inventory_row.model";

@Table({ tableName: "InventoryDocs" })
export default class TraceInventoryDoc extends Model {
  @PrimaryKey
  @Column
  InventoryDocPK: number;

  @Column
  InventoryDate: Date;

  @ForeignKey(() => TracePlant)
  @Column
  PlantPK: number;

  @Column
  Finished: boolean;

  @BelongsTo(() => TracePlant)
  plant: TracePlant;

  @HasMany(() => TraceInventoryRow)
  inventory_rows: TraceInventoryRow[];
}
