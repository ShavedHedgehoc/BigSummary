import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeRecord from "src/tube_records/tube_records.model";
import TubeSession from "src/tube_sessions/tube_sessions.model";

interface TubeConveyorCreationsAttrs {
  name: string;
}

@Table({ tableName: "tube_conveyors", createdAt: false, updatedAt: false })
export default class TubeConveyor extends Model<TubeConveyor, TubeConveyorCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, unique: true })
  barcode: string;

  @HasMany(() => TubeRecord)
  tube_records: TubeRecord[];

  @HasMany(() => TubeSession)
  tube_sessions: TubeSession[];
}
