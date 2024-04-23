import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Record from "src/records/records.model";

interface ApparatusCreationsAttrs {
  value: string;
}

@Table({ tableName: "apparatuses", createdAt: false, updatedAt: false })
export default class Apparatus extends Model<Apparatus, ApparatusCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id аппарата" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "105", description: "Аппарат" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Record)
  records: Record[];
}
