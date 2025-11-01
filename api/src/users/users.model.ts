import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Length,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import History from "src/histories/histories.model";
import Role from "src/roles/roles.model";
import UserRoles from "src/user-roles/user-roles.model";
import Token from "src/token/token.model";
import UserSettings from "src/user-settings/user-settings.model";
import Plant from "src/plants/plant.model";

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
  @Length({ min: 1, max: 60 })
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

  @BelongsToMany(() => Role, () => UserRoles)
  roles_for_filter: Role[];

  @HasMany(() => History)
  histories: History[];

  @HasMany(() => Token)
  token: Token;

  @HasOne(() => UserSettings)
  user_settings?: UserSettings;
}
