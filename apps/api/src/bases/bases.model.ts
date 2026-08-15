import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import Boil from "src/boils/boil.model";

interface BasesCreationsAttrs {
  code: string;
  marking: string;
}

@Table({ tableName: "bases", createdAt: false, updatedAt: false })
export default class Base extends Model<Base, BasesCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id сводки" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "053456", description: "Шестизначный код 1С" })
  @AllowNull(false)
  @Unique(true)
  @Column
  code: string;

  @ApiProperty({ example: "PC10/16", description: "Артикул основы" })
  @Column
  marking: string;

  @HasOne(() => Boil)
  boil: Boil;
}
