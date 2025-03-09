import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";

interface TubeConveyorPostCreationsAttrs {
  value: string;
}

@Table({ tableName: "tube_conveyor_posts", createdAt: false, updatedAt: false })
export default class TubeConveyorPost extends Model<TubeConveyorPost, TubeConveyorPostCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  //   @HasMany(() => Record)
  //   records: Record[];
}
