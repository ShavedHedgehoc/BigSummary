import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceWeighting from "./trace_weighting.model";
import TraceLoad from "./trace_weighting.model";

@Table({ tableName: "Containers" })
export default class TraceContainer extends Model {
  @PrimaryKey
  @Column
  ContainerPK: number;

  @Column
  ContainerName: string;

  @HasMany(() => TraceWeighting)
  weightings: TraceWeighting[];

  @HasOne(() => TraceLoad)
  load: TraceLoad;
}
