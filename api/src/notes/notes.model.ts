import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";

import History from "src/histories/histories.model";

interface NotesCreationsAttrs {
  value: string;
}

@Table({ tableName: "notes", createdAt: false, updatedAt: false })
export default class Note extends Model<History, NotesCreationsAttrs> {
  @ApiProperty({ example: "1", description: "Уникальный id " })
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER, unique: true })
  id: number;

  @ApiProperty({ example: "Комментарий к записи", description: "Значение комментария" })
  @Column({ type: DataType.STRING })
  value: string;

  @HasOne(() => History)
  history: History;
}
