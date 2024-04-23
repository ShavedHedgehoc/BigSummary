import { ApiProperty } from "@nestjs/swagger";
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Doc from "src/docs/docs.model";

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

  @HasMany(() => Doc)
  docs: Doc[];
}
