import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeHistory from "src/tube_histories/tube_histories.model";

interface TubeHistoryTypesCreationsAttrs {
  value: string;
}

@Table({ tableName: "tube_history_types", createdAt: false, updatedAt: false })
export default class TubeHistoryType extends Model<TubeHistoryType, TubeHistoryTypesCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  description: string;

  @HasMany(() => TubeHistory)
  tube_hystories: TubeHistory[];
}
