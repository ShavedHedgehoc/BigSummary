import { ApiProperty } from "@nestjs/swagger";

export class CreateHistoryTypeDto {
  @ApiProperty({ example: "base_check", description: "Тип записи" })
  readonly value: string;
  @ApiProperty({ example: "Основа на пробе", description: "Описание типа записи" })
  readonly description: string;
}
