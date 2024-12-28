import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceWeighting from "./trace_weighting.model";
import TraceAuthor from "./trace_author.model";
import TraceLoad from "./trace_weighting.model";

@Table({ tableName: "Documents" })
export default class TraceDocument extends Model {
  @PrimaryKey
  @Column
  DocumentPK: number;

  @Column
  DocumentClid: string;

  // missed foreign key
  @Column
  DoctypePK: number;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorPK: number;

  @Column
  CreateDate: Date;

  @Column
  Plant: string;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;

  @HasMany(() => TraceWeighting)
  weightings: TraceWeighting[];

  @HasMany(() => TraceLoad)
  loads: TraceLoad[];
}
