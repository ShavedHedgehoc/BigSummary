import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceDocument from "./trace_document.model";
import TraceBoilRecord from "./trace_boil_record.model";

@Table({ tableName: "Operations" })
export default class TraceOperation extends Model {
  @PrimaryKey
  @Column
  OperationPK: number;

  @Column
  OperationCode: string;

  @Column
  OperationName: string;

  @HasMany(() => TraceBoilRecord)
  boil_records: TraceBoilRecord[];
}
