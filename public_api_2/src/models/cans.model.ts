import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Record from './records.model';

interface CansCreationsAttrs {
  value: string;
}

@Table({ tableName: 'cans', createdAt: false, updatedAt: false })
export default class Can extends Model<Can, CansCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id емкости' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: '104', description: 'Емкость' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @HasMany(() => Record)
  records: Record[];
}
