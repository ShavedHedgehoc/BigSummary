import { ApiProperty } from "@nestjs/swagger";

export class UpdateEmployeeDto {
  @ApiProperty({ example: 1, description: "id пользователя рабочей станции" })
  readonly id: number;
  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя рабочей станции" })
  readonly name: string;
  @ApiProperty({ example: "1234567890123", description: "Штрихкод пользователя рабочей станции" })
  readonly barcode: string;
  @ApiProperty({ example: "1", description: "id роли" })
  readonly occupationId: number;
}
