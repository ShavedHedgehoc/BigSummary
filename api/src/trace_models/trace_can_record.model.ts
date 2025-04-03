import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import TraceCan from "./trace_can.model";
import TraceAuthor from "./trace_author.model";
import TraceBatch from "./trace_batch.model";
import TraceCanState from "./trace_can_state.model";

@Table({ tableName: "CanRecords" })
export default class TraceCanRecord extends Model {
  @PrimaryKey
  @Column
  CanRecordPK: number;

  @ForeignKey(() => TraceCan)
  @Column
  CanPK: number;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorPK: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchPK: number;

  @ForeignKey(() => TraceCanState)
  @Column
  CanStatePK: number;

  @Column
  CreateDate: Date;

  @BelongsTo(() => TraceCan)
  can: TraceCan;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;

  @BelongsTo(() => TraceBatch)
  batch: TraceBatch;

  @BelongsTo(() => TraceCanState)
  state: TraceCanState;
}
