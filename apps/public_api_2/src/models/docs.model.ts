import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Plant from './plant.model';
import Record from './records.model';

interface DocsCreationsAttrs {
  plantId: number;
  date: Date;
}

@Table({ tableName: 'docs' })
export default class Doc extends Model<Doc, DocsCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id сводки' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: '2', description: 'Уникальный id площадки' })
  @ForeignKey(() => Plant)
  @Column
  plantId: number;

  @ApiProperty({ example: '22-04-2024', description: 'Дата сводки' })
  @AllowNull(false)
  @Column
  date: Date;

  @BelongsTo(() => Plant)
  plants: Plant;

  @HasMany(() => Record)
  records: Record[];
}
