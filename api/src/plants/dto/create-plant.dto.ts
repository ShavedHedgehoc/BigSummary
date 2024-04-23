import { ApiProperty } from "@nestjs/swagger";

export class CreatePlantDto {
  @ApiProperty({ example: "Колпино", description: "Площадка" })
  readonly value: string;
}
