import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Role from "./roles.model";
import User from "src/users/users.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export default class UserRoles extends Model<UserRoles> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  roleId: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
