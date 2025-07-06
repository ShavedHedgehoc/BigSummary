import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeConveyorPost from "src/tube_conveyor_posts/tube_conveyor_posts.model";
import TubeMaterial from "src/tube_materials/tube_materials.model";
import TubeRecord from "src/tube_records/tube_records.model";

interface TubeAssembliesCreationsAttrs {
  tube_record_id: number;
  tube_material_id: number;
  tube_conveyor_post_id: number;
}

@Table({ tableName: "tube_assembly" })
//Спецификации
export default class TubeAssembly extends Model<TubeAssembly, TubeAssembliesCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeRecord)
  @Column
  tube_record_id: number;

  @ForeignKey(() => TubeMaterial)
  @Column
  tube_material_id: number;

  @ForeignKey(() => TubeConveyorPost)
  @Column
  tube_conveyor_post_id: number;

  @BelongsTo(() => TubeRecord)
  tube_record: TubeRecord;

  @BelongsTo(() => TubeMaterial)
  tube_material: TubeMaterial;

  @BelongsTo(() => TubeConveyorPost)
  tube_conveyor_post: TubeConveyorPost;
}
