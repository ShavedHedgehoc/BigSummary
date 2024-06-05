import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "ivanov@mail.ru", description: "Электронная почта пользователя" })
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @ApiProperty({ example: "password", description: "Пароль пользователя" })
  @IsString({ message: "Пароль должен быть строкой" })
  @Length(1, 20, { message: "Пароль должен содержать от 1 до 20 символов" })
  readonly password: string;
}
