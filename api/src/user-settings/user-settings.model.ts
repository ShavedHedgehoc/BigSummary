import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import User from "src/users/users.model";
import Plant from "src/plants/plant.model";

interface UserSettingsCreationsAttrs {
  user_id: number;
  plant_id: number;
}

@Table({ tableName: "user_settings", createdAt: false, updatedAt: false })
export default class UserSettings extends Model<UserSettings, UserSettingsCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Plant)
  @Column
  plant_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Plant)
  plant: Plant;
}
