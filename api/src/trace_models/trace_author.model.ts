import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceDocument from "./trace_document.model";
import TraceBoilRecord from "./trace_boil_record.model";
import TraceCanRecord from "./trace_can_record.model";
import TraceCanLocation from "./trace_can_location.model";
import TraceInventoryRow from "./trace_inventory_row.model";

@Table({ tableName: "Authors" })
export default class TraceAuthor extends Model {
  @PrimaryKey
  @Column
  AuthorPK: number;

  @Column
  AuthorName: string;

  @Column
  AuthorBarcode: string;

  @HasMany(() => TraceDocument)
  documents: TraceDocument[];

  @HasMany(() => TraceBoilRecord)
  boil_records: TraceBoilRecord[];

  @HasMany(() => TraceCanRecord)
  can_records: TraceCanRecord[];

  @HasMany(() => TraceCanLocation)
  locations: TraceCanLocation[];

  @HasMany(() => TraceInventoryRow)
  inventory_rows: TraceInventoryRow[];
}
