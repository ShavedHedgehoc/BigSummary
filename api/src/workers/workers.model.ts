import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Occupation from "src/occupations/occupations.model";

interface WorkerCreationsAttrs {
  name: string;
  barcode: string;
}

@Table({ tableName: "workers" })
export default class Worker extends Model<Worker, WorkerCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id пользователя рабочей станции" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя рабочей станции" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: "1234567890123", description: "Штрихкод пользователя рабочей станции" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  barcode: string;

  @BelongsTo(() => Occupation)
  occupation: Occupation;
}
