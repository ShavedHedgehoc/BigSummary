import { ApiProperty } from '@nestjs/swagger';
import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Regulation from './regulations.model';

interface MarkingSampleCreationsAttrs {
  product_id: number;
  water_base_min_weight: number;
  water_base_max_weight: number;
  per_box: number;
  box_per_row: number;
  row_on_pallet: number;
  gasket: string;
  seal: boolean;
  technician_note: string;
  packaging_note: string;
  marking_sample_id: number;
}

@Table({ tableName: 'marking_sample' })
export default class MarkingSample extends Model<MarkingSample, MarkingSampleCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный id строки' })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING })
  value: string;

  @HasMany(() => Regulation)
  regulations: Regulation[];
}
