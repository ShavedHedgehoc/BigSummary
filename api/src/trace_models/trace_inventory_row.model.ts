import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceInventoryDoc from "./trace_inventory_doc.model";
import TraceProduct from "./trace_product.model";
import TraceLot from "./trace_lot.model";
import TraceAuthor from "./trace_author.model";

@Table({ tableName: "InventoryRows" })
export default class TraceInventoryRow extends Model {
  @PrimaryKey
  @Column
  InventoryRowPK: number;

  @ForeignKey(() => TraceInventoryDoc)
  @Column
  InventoryDocPK: number;

  @ForeignKey(() => TraceProduct)
  @Column
  ProductId: number;

  @ForeignKey(() => TraceLot)
  @Column
  LotPK: number;

  @Column
  ExpDate: Date;

  @Column
  Quantity: number;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorPK: number;

  @Column
  CreateDate: Date;

  @BelongsTo(() => TraceInventoryDoc)
  inventory_doc: TraceInventoryDoc;

  @BelongsTo(() => TraceProduct)
  product: TraceProduct;

  @BelongsTo(() => TraceLot)
  lot: TraceLot;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;
}
