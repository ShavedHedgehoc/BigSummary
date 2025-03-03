import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceProduct from "./trace_product.model";
import TraceBatch from "./trace_batch.model";

@Table({ tableName: "BtProducts" })
export default class TraceBtProduct extends Model {
  @PrimaryKey
  @Column
  BtProductPK: number;

  @ForeignKey(() => TraceProduct)
  @Column
  ProductId: number;

  @ForeignKey(() => TraceBatch)
  @Column
  BatchPK: number;

  @BelongsTo(() => TraceProduct)
  trace_product: TraceProduct;

  @BelongsTo(() => TraceBatch)
  trace_batch: TraceBatch;
}
