import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceBatch from "src/trace_models/trace_batch.model";
import TraceDocument from "./trace_document.model";
import TraceContainer from "./trace_container.model";
import TraceProduct from "./trace_product.model";
import TraceLot from "./trace_lot.model";

@Table({ tableName: "Weightings" })
export default class TraceWeighting extends Model {
  @PrimaryKey
  @Column
  WeightingsPK: number;

  @ForeignKey(() => TraceDocument)
  @Column
  DocumentPK: number;

  @ForeignKey(() => TraceContainer)
  @Column
  ContainerPK: number;

  @ForeignKey(() => TraceProduct)
  @Column
  ProductId: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchPK: number;

  @ForeignKey(() => TraceLot)
  @Column
  LotPK: number;

  @Column
  Quantity: number;

  @BelongsTo(() => TraceDocument)
  document: TraceDocument;

  @BelongsTo(() => TraceContainer)
  container: TraceContainer;

  @BelongsTo(() => TraceProduct)
  product: TraceProduct;

  @BelongsTo(() => TraceBatch)
  batch: TraceBatch;

  @BelongsTo(() => TraceLot)
  lot: TraceLot;
}
