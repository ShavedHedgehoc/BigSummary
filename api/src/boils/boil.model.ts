import { ApiProperty } from "@nestjs/swagger";
import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Base from "src/bases/bases.model";
import History from "src/histories/histories.model";
import Record from "src/records/records.model";

interface BoilsCreationsAttrs {
  value: string;
}

@Table({ tableName: "boils", createdAt: false, updatedAt: false })
export default class Boil extends Model<Boil, BoilsCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id варки" })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "123A4Y", description: "Варка" })
  @AllowNull(false)
  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @ForeignKey(() => Base)
  @Column
  base_id: number;

  @Column({ type: DataType.STRING })
  letter: string;

  @Column({ type: DataType.NUMBER })
  number: number;

  @Column({ type: DataType.NUMBER })
  year: number;

  @BelongsTo(() => Base)
  base: Base;

  @HasMany(() => Record)
  records: Record[];

  @HasMany(() => History)
  histories: History[];

  @BeforeCreate
  static addMonthLetter(instance: Boil) {
    const val = instance.value;
    const lastSymbol = val.substring(val.length - 1);
    if (["Z", "Y", "S"].includes(lastSymbol)) {
      instance.letter = val.substring(val.length - 3, val.length - 2);
      instance.year = Number("202" + val.substring(val.length - 2, val.length - 1));
      instance.number = Number(val.substring(0, val.length - 3));
    } else {
      instance.letter = val.substring(val.length - 2, val.length - 1);
      instance.year = Number("202" + val.substring(val.length - 1));
      instance.number = Number(val.substring(0, val.length - 2));
    }
  }
}
