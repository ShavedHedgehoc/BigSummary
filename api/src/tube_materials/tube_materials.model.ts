import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import TubeAssembly from "src/tube_assembly/tube_assembly.model";
import TubeSpecification from "src/tube_specifications/tube_specifications.model";

interface TubeMaterialCreationsAttrs {
  code_1C: string;
  name: string;
}

@Table({ tableName: "tube_materials", createdAt: false, updatedAt: false })
//Сырье и материалы
export default class TubeMaterial extends Model<TubeMaterial, TubeMaterialCreationsAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  code_1C: string;

  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => TubeSpecification)
  tube_specifications: TubeSpecification[];

  @HasMany(() => TubeAssembly)
  tube_assemblies: TubeAssembly[];
}
