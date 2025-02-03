import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
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
import Apparatus from "src/apparatuses/apparatuses.model";
import Boil from "src/boils/boil.model";
import Can from "src/cans/cans.model";
import Conveyor from "src/conveyors/conveyor.model";
import Doc from "src/docs/docs.model";
import History from "src/histories/histories.model";
import Product from "src/products/products.model";
import RecordRegulation from "src/record_regulations/record_regulations.model";
import Workshop from "src/workshops/workshop.model";

interface RecordsCreationsAttrs {
  productId: number;
  boilId: number;
  apparatusId: number;
  canId: number;
  conveyorId: number;
  plan: number;
  bbf: string;
  note: string;
  workshopId: number;
  water_base_id: number;
  organic_base_id: number;
}

@Table({ tableName: "records" })
export default class Record extends Model<Record, RecordsCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id записи" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ForeignKey(() => Doc)
  @Column
  doc_id: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Boil)
  @Column
  boilId: number;

  @BelongsTo(() => Boil, "boilId")
  boil: Boil;

  @ForeignKey(() => Apparatus)
  @Column
  apparatusId: number;

  @ForeignKey(() => Can)
  @Column
  canId: number;

  @ForeignKey(() => Conveyor)
  @Column
  conveyorId: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  plan: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  bbf: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  note: string;

  @ForeignKey(() => Workshop)
  @Column
  workshopId: number;

  @ForeignKey(() => Boil)
  @Column
  water_base_id: number;

  @BelongsTo(() => Boil, "water_base_id")
  water_base: Boil;

  @ForeignKey(() => Boil)
  @Column
  organic_base_id: number;

  @BelongsTo(() => Boil, "organic_base_id")
  organic_base: Boil;

  @Default(false)
  @Column
  isSet: boolean;

  @BelongsTo(() => Doc)
  doc: Doc;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Apparatus)
  apparatus: Apparatus;

  @BelongsTo(() => Can)
  can: Can;

  @BelongsTo(() => Conveyor)
  conveyor: Conveyor;

  @BelongsTo(() => Workshop)
  workshop: Workshop;

  @HasMany(() => History)
  histories: History[];

  @HasOne(() => RecordRegulation)
  record_regulation: RecordRegulation;

  @BeforeCreate
  static addSetProperty(instance: Record) {
    const apparatus = instance.apparatusId;
    const can = instance.canId;
    if (can || apparatus) {
      instance.isSet = false;
    } else {
      instance.isSet = true;
    }
  }
}
