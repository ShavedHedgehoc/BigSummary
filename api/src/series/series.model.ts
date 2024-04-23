import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "src/products/products.model";

interface SeriesCreationsAttrs {
  value: string;
}

@Table({ tableName: "series", createdAt: false, updatedAt: false })
export default class Serie extends Model<Serie, SeriesCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id серии" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "ENIGMA", description: "Серия продукта" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Product)
  products: Product[];
}
