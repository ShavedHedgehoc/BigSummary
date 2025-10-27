import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Doc from './docs.model';
import Boil from './boil.model';
import History from './histories.model';

interface PlantsCreationsAttrs {
  value: string;
}

@Table({ tableName: 'plants', createdAt: false, updatedAt: false })
export default class Plant extends Model<Plant, PlantsCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id площадки' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: 'Колпино', description: 'Площадка' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ApiProperty({ example: 'КЛП', description: 'Сокращение' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  abb: string;

  @HasMany(() => Doc)
  docs: Doc[];

  @HasMany(() => Boil)
  boils: Boil[];

  @HasMany(() => History)
  histories: History[];
}
