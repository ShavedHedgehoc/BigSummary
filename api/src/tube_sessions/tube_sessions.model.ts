import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Default,
  BelongsTo,
} from "sequelize-typescript";
import Employee from "src/employees/employees.model";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";

interface TubeSessionCreationsAttrs {
  conveyor_id: number;
  employee_id: number;
}

@Table({ tableName: "tube_sessions" })
export default class TubeSession extends Model<TubeSession, TubeSessionCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeConveyor)
  @Column
  conveyor_id: number;

  @ForeignKey(() => Employee)
  @Column
  employee_id: number;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  finished: boolean;

  @BelongsTo(() => TubeConveyor)
  tube_conveyor: TubeConveyor;

  @BelongsTo(() => Employee)
  employee: Employee;
}
