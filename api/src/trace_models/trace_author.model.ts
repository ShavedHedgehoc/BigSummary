import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceDocument from "./trace_document.model";
import TraceBoilRecord from "./trace_boil_record.model";

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
}
