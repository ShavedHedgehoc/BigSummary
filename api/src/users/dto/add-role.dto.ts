import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "USER", description: "Значение роли" })
  readonly value: string;
  @ApiProperty({ example: "1", description: "Идентификатор пользователя" })
  readonly userId: number;
}
