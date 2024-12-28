import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceProduct from "./trace_product.model";
import TraceWeighting from "./trace_weighting.model";
import TraceSeller from "./trace_seller.model";
import TraceManufacturer from "./trace_manufacturer.model";
import TraceManufacturerLot from "./trace_manufacturer_lot.model";
import TraceTrademark from "./trace_trademark.model";

@Table({ tableName: "Lots" })
export default class TraceLot extends Model {
  @PrimaryKey
  @Column
  LotPK: number;

  @Column
  LotName: string;

  @ForeignKey(() => TraceProduct)
  @Column
  ProductId: number;

  @ForeignKey(() => TraceSeller)
  @Column
  SellerPK: number;

  @ForeignKey(() => TraceManufacturer)
  @Column
  ManufacturerPK: number;

  @ForeignKey(() => TraceManufacturerLot)
  @Column
  ManufacturerLotPK: number;

  @ForeignKey(() => TraceTrademark)
  @Column
  TradeMarkPK: number;

  @BelongsTo(() => TraceProduct)
  product: TraceProduct;

  @BelongsTo(() => TraceSeller)
  seller: TraceSeller;

  @BelongsTo(() => TraceManufacturer)
  manufacturer: TraceManufacturer;

  @BelongsTo(() => TraceManufacturerLot)
  manufacturer_lot: TraceManufacturerLot;

  @BelongsTo(() => TraceTrademark)
  trademark: TraceTrademark;

  @HasMany(() => TraceWeighting)
  weightings: TraceWeighting[];
}
