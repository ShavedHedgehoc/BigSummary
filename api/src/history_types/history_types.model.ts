import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import History from "src/histories/histories.model";

interface HistoryTypesCreationsAttrs {
  value: string;
}

@Table({ tableName: "history_types", createdAt: false, updatedAt: false })
export default class HistoryType extends Model<HistoryType, HistoryTypesCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id типа записи" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "base_check", description: "Тип записи" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ApiProperty({ example: "Основа на пробе", description: "Описание типа записи" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  description: string;

  @ApiProperty({ example: "true", description: "Статусы принадлежат основе" })
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN })
  for_boil: boolean;

  @HasMany(() => History)
  hystorys: History[];
}
