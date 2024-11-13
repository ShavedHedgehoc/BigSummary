import { ApiProperty } from "@nestjs/swagger";

export class UpdateConveyorDto {
  @ApiProperty({ example: 1, description: "id конвейера" })
  readonly id: number;
  @ApiProperty({ example: "102", description: "Наименование конвейера" })
  readonly value: string;
  @ApiProperty({ example: "1234567890123", description: "Штрихкод конвейера" })
  readonly barcode: string;
}
