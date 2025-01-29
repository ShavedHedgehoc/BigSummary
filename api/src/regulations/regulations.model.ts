import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
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
  note: string;
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

  @Column({ type: DataType.DECIMAL, unique: true })
  water_base_min_weight: number;

  @Column({ type: DataType.DECIMAL, unique: true })
  water_base_max_weight: number;

  @Column({ type: DataType.INTEGER, unique: true })
  per_box: number;

  @Column({ type: DataType.INTEGER, unique: true })
  box_per_row: number;

  @Column({ type: DataType.INTEGER, unique: true })
  row_on_pallet: number;

  @Column({ type: DataType.STRING })
  gasket: string;

  @Column({ type: DataType.BOOLEAN })
  seal: boolean;

  @Column({ type: DataType.STRING })
  note: string;

  @BelongsTo(() => Product)
  product: Product;
}
