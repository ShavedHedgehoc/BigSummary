import { ApiProperty } from "@nestjs/swagger";

export class CreateSerieDto {
  @ApiProperty({ example: "ENIGMA", description: "Серия продукта" })
  readonly value: string;
}
