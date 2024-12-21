import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLoad from "src/trace_models/trace_weighting.model";
import TraceWeighting from "src/trace_models/trace_weighting.model";
import TraceBoil from "./trace_boils.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "Batchs" })
export default class TraceBatch extends Model {
  @PrimaryKey
  @Column
  @ApiProperty({ example: 123, description: "123A3" })
  BatchPK: number;

  @Column
  BatchName: string;

  @Column
  BatchDate: Date;

  @Column
  Plant: string;

  @HasMany(() => TraceWeighting)
  weightings: TraceWeighting[];

  @HasMany(() => TraceLoad)
  loads: TraceLoad[];

  @HasMany(() => TraceBoil)
  boils: TraceBoil[];
}
