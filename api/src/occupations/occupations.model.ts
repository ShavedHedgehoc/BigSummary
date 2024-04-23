import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Employee from "src/employees/employees.model";

interface OccupationCreationsAttrs {
  value: string;
}

@Table({ tableName: "occupations", createdAt: false, updatedAt: false })
export default class Occupation extends Model<Occupation, OccupationCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id  специальности пользователя рабочей станции" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "TECHNOLOGIST", description: "Значение специальность пользователя рабочей станции" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ApiProperty({ example: "Технолог", description: "Описание специальности пользователя рабочей станции" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  description: string;

  @HasMany(() => Employee)
  workers: Employee[];
}
