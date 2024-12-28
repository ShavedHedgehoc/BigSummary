import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import TraceBatch from "./trace_batch.model";
import TraceOperation from "./trace_operation.model";
import TraceAuthor from "./trace_author.model";

@Table({ tableName: "BoilRecords" })
export default class TraceBoilRecord extends Model {
  @PrimaryKey
  @Column
  BoilRecordsPK: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchId: number;

  @ForeignKey(() => TraceOperation)
  @Column
  OperationId: number;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorId: number;

  @Column
  Temperature: number | null;

  @Column
  CreateDate: Date;

  @BelongsTo(() => TraceBatch)
  batch: TraceBatch;

  @BelongsTo(() => TraceOperation)
  operation: TraceOperation;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;
}
