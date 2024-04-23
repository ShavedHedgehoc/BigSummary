import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Record from "src/records/records.model";

interface ConveyorsCreationsAttrs {
  value: string;
}

@Table({ tableName: "conveyors", createdAt: false, updatedAt: false })
export default class Conveyor extends Model<Conveyor, ConveyorsCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id конвейера" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "118", description: "Конвейер" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Record)
  records: Record[];
}
