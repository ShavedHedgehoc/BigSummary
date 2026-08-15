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
import Occupation from './occupations.model';
import History from './histories.model';

interface EmployeeCreationsAttrs {
  name: string;
  barcode: string;
}

@Table({ tableName: 'employees' })
export default class Employee extends Model<Employee, EmployeeCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id пользователя рабочей станции' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: 'Иванов А.В.', description: 'Имя пользователя рабочей станции' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @ApiProperty({ example: '1234567890123', description: 'Штрихкод пользователя рабочей станции' })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  barcode: string;

  @ForeignKey(() => Occupation)
  @Column
  occupationId: number;

  @BelongsTo(() => Occupation)
  occupation: Occupation;

  @HasMany(() => History)
  histories: History[];
}
