import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceCanRecord from "./trace_can_record.model";

@Table({ tableName: "CanStates" })
export default class TraceCanState extends Model {
  @PrimaryKey
  @Column
  CanStatePK: number;

  @Column
  CanStateName: string;

  @Column
  CanStateDescription: string;

  @Column
  isBaseState: boolean;

  @HasMany(() => TraceCanRecord)
  can_records: TraceCanRecord[];
}
