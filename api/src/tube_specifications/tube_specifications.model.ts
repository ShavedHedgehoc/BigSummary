import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeMaterial from "src/tube_materials/tube_materials.model";
import TubeProduct from "src/tube_products/tube_products.model";

interface TubeSpecificationsCreationsAttrs {
  tube_product_id: number;
  tube_material_id: number;
}

@Table({ tableName: "tube_specifications" })
export default class TubeSpecification extends Model<TubeSpecification, TubeSpecificationsCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => TubeProduct)
  @Column
  tube_product_id: number;

  @ForeignKey(() => TubeMaterial)
  @Column
  tube_material_id: number;

  @BelongsTo(() => TubeProduct)
  tube_product: TubeProduct;

  @BelongsTo(() => TubeMaterial)
  tube_material: TubeMaterial;
}
