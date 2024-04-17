import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "user", description: "Значение роли" })
  readonly value: string;
  @ApiProperty({ example: "Пользователь", description: "Описание роли" })
  readonly description: string;
}
