import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceWeighting from "src/trace_models/trace_weighting.model";
import TraceBoil from "./trace_boils.model";

@Table({ tableName: "Products" })
export default class TraceProduct extends Model {
  @PrimaryKey
  @Column
  ProductId: number;

  @Column
  ProductName: string;

  @Column
  ProductMarking: string;

  @Column
  ProductBarcode: string;

  @HasMany(() => TraceWeighting)
  weightings: TraceWeighting[];

  @HasMany(() => TraceBoil)
  boils: TraceBoil[];
}
