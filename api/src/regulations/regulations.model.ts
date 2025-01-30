import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import MarkingSample from "src/marking_sample/marking_sample.model";
import Product from "src/products/products.model";

interface RegulationCreationsAttrs {
  product_id: number;
  water_base_min_weight: number;
  water_base_max_weight: number;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string;
  packaging_note: string;
  marking_sample_id: number;
}

@Table({ tableName: "regulations" })
export default class Regulation extends Model<Regulation, RegulationCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id строки" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @Column({ type: DataType.DECIMAL })
  water_base_min_weight: number;

  @Column({ type: DataType.DECIMAL })
  water_base_max_weight: number;

  @Column({ type: DataType.INTEGER })
  per_box: number;

  @Column({ type: DataType.INTEGER })
  box_per_row: number;

  @Column({ type: DataType.INTEGER })
  row_on_pallet: number;

  @Column({ type: DataType.STRING })
  gasket: string;

  @Column({ type: DataType.BOOLEAN })
  seal: boolean;

  @Column({ type: DataType.STRING })
  technician_note: string;

  @Column({ type: DataType.STRING })
  packaging_note: string;

  @ForeignKey(() => MarkingSample)
  @Column
  marking_sample_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => MarkingSample)
  marking_sample: MarkingSample;
}
