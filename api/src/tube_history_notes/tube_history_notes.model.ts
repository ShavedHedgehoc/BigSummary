import { AutoIncrement, Column, DataType, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeHistory from "src/tube_histories/tube_histories.model";

interface TubeHistoriesNotesCreationsAttrs {
  value: string;
}

@Table({ tableName: "tube_histories_notes", createdAt: false, updatedAt: false })
export default class TubeHistoryNote extends Model<TubeHistoryNote, TubeHistoriesNotesCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING })
  value: string;

  @HasOne(() => TubeHistory)
  tube_history: TubeHistory;
}
