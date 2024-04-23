import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Record from "src/records/records.model";

interface BoilsCreationsAttrs {
  value: string;
}

@Table({ tableName: "boils", createdAt: false, updatedAt: false })
export default class Boil extends Model<Boil, BoilsCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id варки" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "123A4Y", description: "Варка" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Record)
  records: Record[];
}
