import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceLoad from "src/trace_models/trace_weighting.model";
import TraceWeighting from "src/trace_models/trace_weighting.model";
import TraceBoil from "./trace_boils.model";
import { ApiProperty } from "@nestjs/swagger";
import TraceCanRecord from "./trace_can_record.model";
import TraceBtProduct from "./trace_bt_product.model";

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

  @HasMany(() => TraceCanRecord)
  can_records: TraceCanRecord[];

  @HasOne(() => TraceBtProduct)
  bt_products: TraceBtProduct;
}
