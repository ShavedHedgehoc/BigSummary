import { ApiProperty } from "@nestjs/swagger";

export class UpdateRolesDto {
  @ApiProperty({ example: 1, description: "id пользователя" })
  readonly id: number;
  @ApiProperty({ example: [1, 2, 3], description: "Идентификаторы ролей" })
  readonly roles: number[];
}
