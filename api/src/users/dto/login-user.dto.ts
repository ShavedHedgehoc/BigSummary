import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: "ivanov@mail.ru", description: "Электронная почта пользователя" })
  readonly email: string;
  @ApiProperty({ example: "password", description: "Пароль пользователя" })
  readonly password: string;
}
