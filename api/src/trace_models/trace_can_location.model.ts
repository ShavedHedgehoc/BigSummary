import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceAuthor from "./trace_author.model";
import TracePlant from "./trace_plant.model";
import TraceCan from "./trace_can.model";

@Table({ tableName: "CanLocations" })
export default class TraceCanLocation extends Model {
  @PrimaryKey
  @Column
  CanLocationPK: number;

  @ForeignKey(() => TraceCan)
  @Column
  CanPK: number;

  @ForeignKey(() => TracePlant)
  @Column
  PlantPK: number;

  @Column
  Transit: boolean;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorPK: number;

  @Column
  CreateDate: Date;

  @BelongsTo(() => TraceCan)
  can: TraceCan;

  @BelongsTo(() => TracePlant)
  plant: TracePlant;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;
}
