import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Boil from "src/boils/boil.model";
import Doc from "src/docs/docs.model";
import History from "src/histories/histories.model";
import UserSettings from "src/user-settings/user-settings.model";
import User from "src/users/users.model";

interface PlantsCreationsAttrs {
  value: string;
}

@Table({ tableName: "plants", createdAt: false, updatedAt: false })
export default class Plant extends Model<Plant, PlantsCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id площадки" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "Колпино", description: "Площадка" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ApiProperty({ example: "КЛП", description: "Сокращение" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  abb: string;

  @HasMany(() => Doc)
  docs: Doc[];

  @HasMany(() => Boil)
  boils: Boil[];

  @HasMany(() => History)
  histories: History[];

  @HasMany(() => UserSettings)
  user_settings: UserSettings[];
}
