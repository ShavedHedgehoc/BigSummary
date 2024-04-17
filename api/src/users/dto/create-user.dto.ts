import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя" })
  readonly name: string;
  @ApiProperty({ example: "ivanov@mail.ru", description: "Электронная почта пользователя" })
  readonly email: string;
  @ApiProperty({ example: "password", description: "Пароль пользователя" })
  readonly password: string;
}
