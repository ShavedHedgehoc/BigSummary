import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Worker from "src/workers/workers.model";

interface OccupationCreationsAttrs {
  value: string;
}

@Table({ tableName: "occupations" })
export default class Occupation extends Model<Occupation, OccupationCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id  специальности пользователя рабочей станции" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "Технолог", description: "Специальность пользователя рабочей станции" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Worker)
  workers: Worker[];
}
