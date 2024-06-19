import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";
import User from "src/users/users.model";
import UserRoles from "./user-roles.model";

interface RoleCreationsAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles", createdAt: false, updatedAt: false })
export default class Role extends Model<Role, RoleCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id роли" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "user", description: "Значение роли" })
  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.STRING })
  value: string;

  @ApiProperty({ example: "Пользователь", description: "Описание роли" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
