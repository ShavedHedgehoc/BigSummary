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
import Record from './records.model';

interface WorkshopsCreationsAttrs {
  value: string;
}

@Table({ tableName: 'workshops', createdAt: false, updatedAt: false })
export default class Workshop extends Model<Workshop, WorkshopsCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id цеха' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: '1й этаж', description: 'Цех' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Record)
  records: Record[];
}
