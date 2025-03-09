import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";

import Employee from "src/employees/employees.model";

import TubeHistoriesNote from "src/tube_history_notes/tube_history_notes.model";

import TubeHistoryType from "src/tube_history_types/tube_history_types.model";
import TubeRecord from "src/tube_records/tube_records.model";

interface TubeHistoriesCreationsAttrs {
  tube_record_id: number;
  boil_id: number;
  tube_history_type_id: number;
  employee_id: number;
  note: string;
}

@Table({ tableName: "tube_histories" })
export default class TubeHistory extends Model<TubeHistory, TubeHistoriesCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeRecord)
  @Column
  tube_record_id: number;

  @ForeignKey(() => TubeHistoryType)
  @Column
  tube_history_type_id: number;

  @ForeignKey(() => Employee)
  @Column
  employee_id: number;

  @Column({ type: DataType.STRING })
  note: string;

  @ForeignKey(() => TubeHistoriesNote)
  @Column
  tube_history_note_id: number;

  @BelongsTo(() => TubeRecord)
  tube_record: TubeRecord;

  @BelongsTo(() => TubeHistoryType)
  tube_history_type: TubeHistoryType;

  @BelongsTo(() => Employee)
  employee: Employee;

  @BelongsTo(() => TubeHistoriesNote)
  tube_history_note: TubeHistoriesNote;
}
