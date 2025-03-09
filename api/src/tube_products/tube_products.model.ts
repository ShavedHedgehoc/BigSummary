import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeRecord from "src/tube_records/tube_records.model";
import TubeSpecification from "src/tube_specifications/tube_specifications.model";

interface TubeProductCreationsAttrs {
  code_1C: string;
  name: string;
}

@Table({ tableName: "tube_products", createdAt: false, updatedAt: false })
export default class TubeProduct extends Model<TubeProduct, TubeProductCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  code_1C: string;

  @Column({ type: DataType.STRING })
  marking: string;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => TubeRecord)
  tube_records: TubeRecord[];

  @HasMany(() => TubeSpecification)
  tube_specifications: TubeSpecification[];
}
