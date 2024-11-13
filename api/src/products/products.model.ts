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

import Serie from "src/series/series.model";

interface ProductCreationsAttrs {
  code1C: number;
  marking: string;
  name: string;
  serieId: number;
}

@Table({ tableName: "products" })
export default class Product extends Model<Product, ProductCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id продукта" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "058671", description: "Код 1С продукта" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  code1C: string;

  @ApiProperty({ example: "CNT9/65", description: "Артикул продукта" })
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  marking: string;

  @ApiProperty({
    example: "CNT9/65 Тонирующая маска для волос NEWTONE ESTEL HAUTE COUTURE 9/65 Блондин фиолетово-красный, 400 мл",
    description: "Наименование продукта",
  })
  @AllowNull(true)
  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => Serie)
  @Column
  serieId: number;

  @BelongsTo(() => Serie)
  serie: Serie;

  // @HasMany(() => Record)
  // records: Record[];
}
