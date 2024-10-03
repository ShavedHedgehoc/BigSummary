import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Boil from "src/boils/boil.model";
import Employee from "src/employees/employees.model";
import HistoryType from "src/history_types/history_types.model";
import Record from "src/records/records.model";
import User from "src/users/users.model";

interface HistoriesCreationsAttrs {
  recordId: number;
  boilId: number;
  historyTypeId: number;
  userId: number;
  employeeId: number;
  note: string;
}

@Table({ tableName: "histories" })
export default class History extends Model<History, HistoriesCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id записи" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "1", description: "id строки сводки" })
  @ForeignKey(() => Record)
  @Column
  record_id: number;

  @ApiProperty({ example: "1", description: "id партии" })
  @ForeignKey(() => Boil)
  @Column
  boil_id: number;

  @ApiProperty({ example: "1", description: "id типа записи" })
  @ForeignKey(() => HistoryType)
  @Column
  historyTypeId: number;

  @ApiProperty({ example: "1", description: "id пользователя" })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiProperty({ example: "1", description: "id пользователя рабочей станции" })
  @ForeignKey(() => Employee)
  @Column
  employeeId: number;

  @ApiProperty({ example: "Комментарий к записи", description: "Комментарий к записи" })
  @Column({ type: DataType.STRING })
  note: string;

  @BelongsTo(() => Record)
  record: Record;

  @BelongsTo(() => Boil)
  boil: Boil;

  @BelongsTo(() => HistoryType)
  historyType: HistoryType;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Employee)
  employee: Employee;
}
