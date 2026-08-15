import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import Record from './records.model';
import MarkingSample from './marking_sample.model';

interface RecordRegulationCreationsAttrs {
  record_id: number;
  org_base_min_weight: number;
  org_base_max_weight: number;
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
  marking_feature: string;
  ink_color: string;
}

@Table({ tableName: 'record_regulations' })
export default class RecordRegulation extends Model<RecordRegulation, RecordRegulationCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => Record)
  @Column
  record_id: number;

  @Column({ type: DataType.DECIMAL })
  org_base_min_weight: number;

  @Column({ type: DataType.DECIMAL })
  org_base_max_weight: number;

  @Column({ type: DataType.DECIMAL })
  water_base_min_weight: number;

  @Column({ type: DataType.DECIMAL })
  water_base_max_weight: number;

  @Column({ type: DataType.INTEGER })
  per_box: number;

  @Column({ type: DataType.INTEGER })
  box_per_row: number;

  @Column({ type: DataType.INTEGER })
  row_on_pallet: number;

  @Column({ type: DataType.STRING })
  gasket: string;

  @Column({ type: DataType.BOOLEAN })
  seal: boolean;

  @Column({ type: DataType.STRING })
  technician_note: string;

  @Column({ type: DataType.STRING })
  packaging_note: string;

  @ForeignKey(() => MarkingSample)
  @Column
  marking_sample_id: number;

  @Column({ type: DataType.STRING })
  inc_color: string;

  @Column({ type: DataType.STRING })
  marking_feature: string;

  @BelongsTo(() => Record)
  record: Record;

  @BelongsTo(() => MarkingSample)
  marking_sample: MarkingSample;
}
