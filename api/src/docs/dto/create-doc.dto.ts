import { ApiProperty } from "@nestjs/swagger";

export class CreateDocDto {
  @ApiProperty({ example: "Колпино", description: "Наименование площадки" })
  readonly plant: string;
  @ApiProperty({ example: "04-18-2024", description: "Дата сводки (mm-dd-YYYY)" })
  readonly date: string;
}
