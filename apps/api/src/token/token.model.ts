// import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "src/users/users.model";

interface TokenCreationsAttrs {
  userId: number;
  token: string;
}

@Table({ tableName: "tokens" })
export default class Token extends Model<Token, TokenCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING(2000), unique: true })
  token: string;

  @BelongsTo(() => User)
  user: User;
}
