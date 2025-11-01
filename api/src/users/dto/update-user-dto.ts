import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsNumber } from "class-validator";

interface UserSettings {
  plant_id: number;
}

export class UpdateUserDto {
  @ApiProperty({ example: 1, description: "id пользователя" })
  @IsNumber()
  readonly user_id: number;
  @ApiProperty({ example: "Иванов А.В.", description: "Имя пользователя" })
  @IsString({ message: "Имя должно быть строкой" })
  @Length(1, 60, { message: "Имя пользователя должно содержать от 1 до 60 символов" })
  readonly name: string;
  @ApiProperty({ example: "ivanov@mail.ru", description: "Электронная почта пользователя" })
  @IsString({ message: "Email должен быть строкой" })
  @IsEmail({}, { message: "Некорректный email" })
  readonly email: string;
  @ApiProperty({
    example: `{"plant_id":1}`,
    description: "Настройки пользователя",
  })
  readonly user_settings: UserSettings | null;
}
