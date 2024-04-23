import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import History from "src/histories/histories.model";
import Role from "src/roles/roles.model";
import UserRoles from "src/roles/user-roles.model";

interface UserCreationsAttrs {
  name: string;
  email: string;
  password: string;
}

@Table({ tableName: "users" })
export default class User extends Model<User, UserCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id пользователя" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя" })
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: "ivanov@mail.ru", description: "Электронная почта пользователя" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @ApiProperty({ example: "password", description: "Пароль пользователя" })
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  password: string;

  @ApiProperty({ example: "false", description: "Забанен ли пользователь" })
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  banned: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => History)
  histories: History[];
}
