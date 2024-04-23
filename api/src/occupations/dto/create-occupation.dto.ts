import { ApiProperty } from "@nestjs/swagger";

export class CreateOccupationDto {
  @ApiProperty({ example: "TECHNOLOGIST", description: "Значение специальности" })
  readonly value: string;
  @ApiProperty({ example: "Технолог", description: "Описание специальности" })
  readonly description: string;
}
