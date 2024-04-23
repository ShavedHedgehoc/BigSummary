import { ApiProperty } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя рабочей станции" })
  readonly name: string;
  @ApiProperty({ example: "1234567890123", description: "Штрихкод пользователя рабочей станции" })
  readonly barcode: string;
}
