import { ApiProperty } from "@nestjs/swagger";

export class AddOccupationDto {
  @ApiProperty({ example: "OPERATOR", description: "Значение специальности" })
  readonly value: string;
  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  readonly userId: number;
}
