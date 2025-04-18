import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Boil from "src/boils/boil.model";
import TubeAssembly from "src/tube_assembly/tube_assembly.model";
import TubeConveyor from "src/tube_conveyors/tube_conveyors.model";
import TubeParameter from "src/tube_parameters/tube_parameters.model";
import TubeProduct from "src/tube_products/tube_products.model";

interface TubeRecordCreationsAttrs {}
@Table({ tableName: "tube_records" })
export default class TubeRecord extends Model<TubeRecord, TubeRecordCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeProduct)
  @Column
  tube_product_id: number;

  @ForeignKey(() => TubeConveyor)
  @Column
  tube_conveyor_id: number;

  @ForeignKey(() => Boil)
  @Column
  boil_id: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  plan: number;

  @Column({ type: DataType.DATEONLY })
  start_date: Date;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  active: boolean;

  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  finished: boolean;

  @BelongsTo(() => TubeProduct)
  tube_product: TubeProduct;

  @BelongsTo(() => TubeConveyor)
  tube_conveyor: TubeConveyor;

  @BelongsTo(() => Boil)
  boil: Boil;

  @HasOne(() => TubeParameter)
  tube_parameter: TubeParameter;

  @HasMany(() => TubeAssembly)
  tube_assemblies: TubeAssembly[];
}
