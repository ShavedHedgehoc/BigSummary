import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ example: "000003", description: "Код 1С продукта" })
  readonly code1C: string;
  @ApiProperty({ example: "111", description: "Артикул продукта" })
  readonly marking: string;
  @ApiProperty({ example: "№ 111 Гель-краска 'Эстель' тон черный", description: "Наименование продукта" })
  readonly name: string;
  @ApiProperty({ example: "Эстель", description: "Серия продукта" })
  readonly serie: string;
}
