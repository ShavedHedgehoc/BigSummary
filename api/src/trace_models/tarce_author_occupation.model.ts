import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TraceAuthor from "./trace_author.model";
import TracePlant from "./trace_plant.model";

@Table({ tableName: "AuthorOccupations" })
export default class TraceAuthorOccupation extends Model {
  @PrimaryKey
  @Column
  AuthorOccupationsPK: number;

  @ForeignKey(() => TraceAuthor)
  @Column
  AuthorPK: number;

  @ForeignKey(() => TracePlant)
  @Column
  PlantPK: number;

  @BelongsTo(() => TraceAuthor)
  author: TraceAuthor;

  @BelongsTo(() => TracePlant)
  plant: TracePlant;
}
