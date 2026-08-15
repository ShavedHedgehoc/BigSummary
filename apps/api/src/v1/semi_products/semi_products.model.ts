import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Boil from "src/v1/boils/boil.model";
import Product from "src/v1/products/products.model";
import Record from "src/v1/records/records.model";

interface SemiProductCreationsAttrs {
  record_id: number;
  product_id: number;
  boil_id: number;
}

@Table({ tableName: "semi_products" })
export default class SemiProduct extends Model<
  SemiProduct,
  SemiProductCreationsAttrs
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => Record)
  @Column
  record_id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @ForeignKey(() => Boil)
  @Column
  boil_id: number;

  @BelongsTo(() => Record)
  record: Record;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Boil)
  boil: Boil;
}
