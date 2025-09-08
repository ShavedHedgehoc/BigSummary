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
  Unique,
} from "sequelize-typescript";
import Record from "src/records/records.model";

interface RecordCounterCreationsAttrs {
  record_id: number;
  task_uid: string;
  counter_value: number;
}

@Table({ tableName: "record_counters" })
export default class RecordCounter extends Model<RecordCounter, RecordCounterCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id записи" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: 15, description: "id строки сводки" })
  @ForeignKey(() => Record)
  @Column
  record_id: number;

  @ApiProperty({ example: "c4a40b9a-a608-4a38-832b-6b16d0cc8a72", description: "uuid задачи маркировки" })
  @Unique
  @Column
  task_uid: string;

  @ApiProperty({ example: 15, description: "Значение счетчика" })
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  counter_value: number;

  @BelongsTo(() => Record)
  record: Record;
}
