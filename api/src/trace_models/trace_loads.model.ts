import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceBatch from "src/trace_models/trace_batch.model";
import TraceDocument from "./trace_document.model";
import TraceContainer from "./trace_container.model";

@Table({ tableName: "Loads" })
export default class TraceLoad extends Model {
  @PrimaryKey
  @Column
  LoadsPK: number;

  @ForeignKey(() => TraceDocument)
  @Column
  DocumentPK: number;

  @ForeignKey(() => TraceContainer)
  @Column
  ContainerPK: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchPK: number;

  @BelongsTo(() => TraceDocument)
  document: TraceDocument;

  @BelongsTo(() => TraceContainer)
  container: TraceContainer;

  @BelongsTo(() => TraceBatch)
  batch: TraceBatch;
}
